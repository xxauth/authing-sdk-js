import { AuthenticationTokenProvider } from './AuthenticationTokenProvider';
import {
  checkLoginStatus,
  checkPasswordStrength,
  loginByEmail,
  loginByPhoneCode,
  loginByPhonePassword,
  loginByUsername,
  refreshToken,
  registerByEmail,
  registerByUsername,
  sendEmail,
  registerByPhoneCode,
  updatePassword,
  updatePhone,
  updateEmail,
  bindPhone,
  unbindPhone,
  user,
  setUdv,
  removeUdv,
  udv
} from './../graphqlapi';
import { GraphqlClient } from './../common/GraphqlClient';
import { AuthenticationClientOptions } from './types';
import { SocialAuthenticationClient } from './SocialAuthenticationClient';
import {
  CommonMessage,
  EmailScene,
  RefreshToken,
  RegisterProfile,
  UdfTargetType,
  UpdateUserInput,
  User
} from '../../types/graphql.v2';
import { encrypt } from '../utils';
import { QrCodeAuthenticationClient } from './QrCodeAuthenticationClient';
import { resetPassword, updateUser } from '../graphqlapi';
import { HttpClient } from '../common/HttpClient';

const DEFAULT_OPTIONS: AuthenticationClientOptions = {
  timeout: 10000,
  encrptionPublicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCXF2kRW8oaTPA7KZqqsAuDmmhh
fa1IbxjK3zincLjV5ICJBacxTrKM6T8w/7zTgO/dRin2fACO5d65eOE1R65L2Syt
FWjSMefU8E36cHaykoi0o79qSxlpN7UPnRR1n60kRqlcM0IZ9XOlFszK05aLOrVh
Hdspg836OaW98JYl0QIDAQAB
-----END PUBLIC KEY-----`,
  onError: (_: number, message: string) => {
    throw new Error(message);
  },
  host: 'https://core.xauth.lucfish.com',
  requestFrom: 'sdk',
  encryptFunction: encrypt
};

export class AuthenticationClient {
  // 初始化参数
  options: AuthenticationClientOptions;

  graphqlClientV2: GraphqlClient;
  httpClient: HttpClient;
  tokenProvider: AuthenticationTokenProvider;
  wxqr: QrCodeAuthenticationClient;
  qr: QrCodeAuthenticationClient;
  social: SocialAuthenticationClient;
  constructor(options: AuthenticationClientOptions) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    const graphqlApiEndpointV2 = `${this.options.host}/v2/graphql`;
    // 子模块初始化顺序: GraphqlClient -> ManagementTokenProvider -> Others
    this.graphqlClientV2 = new (this.options.graphqlClient || GraphqlClient)(
      graphqlApiEndpointV2,
      this.options
    );
    this.tokenProvider = new (this.options.tokenProvider || AuthenticationTokenProvider)(this.options);
    this.httpClient = new (this.options.httpClient || HttpClient)(this.options, this.tokenProvider);
    this.wxqr = new QrCodeAuthenticationClient(
      this.options,
      this.tokenProvider,
      this.httpClient,
      'WXAPP_AUTH'
    );
    this.qr = new QrCodeAuthenticationClient(
      this.options,
      this.tokenProvider,
      this.httpClient,
      'APP_AUTH'
    );
    this.social = new SocialAuthenticationClient(
      this.options,
      this.tokenProvider,
      this.httpClient
    );
  }

  private checkLoggedIn() {
    const user = this.tokenProvider.getUser();
    if (!user) {
      throw new Error('请先登录！');
    }
    return user;
  }

  /**
   * @description 通过邮箱注册
   *
   */
  async registerByEmail(
    email: string,
    password: string,
    profile?: RegisterProfile,
    options?: {
      forceLogin?: boolean;
      generateToken?: boolean;
    }
  ) {
    options = options || {};
    profile = profile || {};
    const { forceLogin = false, generateToken = false } = options;
    password = await this.options.encryptFunction(password, this.options.encrptionPublicKey);
    const { registerByEmail: user } = await registerByEmail(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        input: {
          email,
          password,
          profile,
          forceLogin,
          generateToken
        }
      }
    );
    this.tokenProvider.setUser(user);
    return user;
  }

  /**
   * @description 通过用户名密码注册
   *
   */
  async registerByUsername(
    username: string,
    password: string,
    profile?: RegisterProfile,
    options?: {
      forceLogin?: boolean;
      generateToken?: boolean;
    }
  ) {
    options = options || {};
    profile = profile || {};
    const { forceLogin = false, generateToken = false } = options;
    password = await this.options.encryptFunction(password, this.options.encrptionPublicKey);
    const { registerByUsername: user } = await registerByUsername(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        input: {
          username,
          password,
          profile,
          forceLogin,
          generateToken
        }
      }
    );
    this.tokenProvider.setUser(user);
    return user;
  }

  /**
   * @description 通过手机号注册
   *
   */
  async registerByPhoneCode(
    phone: string,
    code: string,
    password?: string,
    profile?: RegisterProfile,
    options?: {
      forceLogin?: boolean;
      generateToken?: boolean;
    }
  ) {
    options = options || {};
    profile = profile || {};
    const { forceLogin = false, generateToken = false } = options;
    password = await this.options.encryptFunction(password, this.options.encrptionPublicKey);
    const { registerByPhoneCode: user } = await registerByPhoneCode(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        input: {
          phone,
          code,
          password,
          profile,
          forceLogin,
          generateToken
        }
      }
    );
    this.tokenProvider.setUser(user);
    return user;
  }

  /**
   * @description 检查密码强度
   *
   */
  async checkPasswordStrength(password: string) {
    const { checkPasswordStrength: result } = await checkPasswordStrength(
      this.graphqlClientV2,
      this.tokenProvider,
      { password }
    );
    return result;
  }

  /**
   * @description 发送短信验证码
   *
   */
  async sendSmsCode(phone: string): Promise<{ code: number; message: string }> {
    // TODO: 这种链接从服务器动态拉取
    const api = `${this.options.host}/api/v2/sms/send`;
    const data = await this.httpClient.request({
      method: 'POST',
      url: api,
      data: { phone }
    });

    return data;
  }

  async sendResetPasswordSmsCode(phone: string): Promise<{ code: number; message: string }> {
    // TODO: 这种链接从服务器动态拉取
    const api = `${this.options.host}/api/v2/sms/send`;
    const data = await this.httpClient.request({
      method: 'POST',
      url: api,
      data: { phone, type: "resetPasswordByPhone" }
    });

    return data;
  }

  async loginByEmail(
    email: string,
    password: string,
    options?: {
      /** 如果用户不存在，是否自动创建一个账号 */
      autoRegister?: boolean;
      /** 图形验证码 */
      captchaCode?: string;
    }
  ) {
    options = options || {};
    const { autoRegister = false, captchaCode } = options;
    password = await this.options.encryptFunction(password, this.options.encrptionPublicKey);
    const { loginByEmail: user } = await loginByEmail(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        input: { email, password, autoRegister, captchaCode }
      }
    );
    this.tokenProvider.setUser(user);
    return user;
  }

  async loginByUsername(
    username: string,
    password: string,
    options?: {
      /** 如果用户不存在，是否自动创建一个账号 */
      autoRegister?: boolean;
      /** 图形验证码 */
      captchaCode?: string;
    }
  ) {
    options = options || {};
    const { autoRegister = false, captchaCode } = options;
    password = await this.options.encryptFunction(password, this.options.encrptionPublicKey);
    const { loginByUsername: user } = await loginByUsername(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        input: { username, password, autoRegister, captchaCode }
      }
    );
    this.tokenProvider.setUser(user);
    return user;
  }

  async loginByPhoneCode(phone: string, code: string) {
    const { loginByPhoneCode: user } = await loginByPhoneCode(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        input: { phone, code }
      }
    );
    this.tokenProvider.setUser(user);
    return user;
  }

  async loginByPhonePassword(
    phone: string,
    password: string,
    options?: {
      /** 如果用户不存在，是否自动创建一个账号 */
      autoRegister?: boolean;
      /** 图形验证码 */
      captchaCode?: string;
    }
  ) {
    options = options || {};
    const { autoRegister = false, captchaCode } = options;
    password = await this.options.encryptFunction(password, this.options.encrptionPublicKey);
    const { loginByPhonePassword: user } = await loginByPhonePassword(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        input: { phone, password, autoRegister, captchaCode }
      }
    );
    this.tokenProvider.setUser(user);
    return user;
  }

  /**
   * 检测 AccessToken 所属用户的登录状态
   * @param token 用户 AccessToken
   */
  async checkLoginStatus(token: string) {
    const res = await checkLoginStatus(this.graphqlClientV2, this.tokenProvider, {
      token
    });
    return res.checkLoginStatus;
  }

  /**
   * @description 发送邮件
   * @param email: 邮件
   * @param scene: 发送场景
   *
   */
  async sendEmail(email: string, scene: EmailScene): Promise<CommonMessage> {
    const { sendEmail: data } = await sendEmail(
      this.graphqlClientV2,
      this.tokenProvider,
      { email, scene }
    );
    return data;
  }

  async resetPhonePassword(
    phone: string,
    code: string,
    newPassword: string
  ): Promise<CommonMessage> {
    newPassword = await this.options.encryptFunction(newPassword, this.options.encrptionPublicKey);
    const { resetPassword: data } = await resetPassword(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        phone,
        code,
        newPassword
      }
    );
    return data;
  }

  async resetEmailPassword(
    email: string,
    code: string,
    newPassword: string
  ): Promise<CommonMessage> {
    newPassword = await this.options.encryptFunction(newPassword, this.options.encrptionPublicKey);
    const { resetPassword: data } = await resetPassword(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        email,
        code,
        newPassword
      }
    );
    return data;
  }

  async updateProfile(updates: UpdateUserInput): Promise<User> {
    const user = this.checkLoggedIn();
    if (updates && updates.password) {
      delete updates.password;
    }
    const { updateUser: updated } = await updateUser(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        id: user.id,
        input: updates
      }
    );
    this.tokenProvider.setUser(updated);
    return updated;
  }

  /**
   * 更新用户密码
   * @param newPassword 新密码
   * @param oldPassword 旧密码
   */
  async updatePassword(
    newPassword: string,
    oldPassword?: string
  ): Promise<User> {
    newPassword =
      newPassword && await this.options.encryptFunction(newPassword, this.options.encrptionPublicKey);
    oldPassword =
      oldPassword && await this.options.encryptFunction(oldPassword, this.options.encrptionPublicKey);

    const { updatePassword: user } = await updatePassword(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        newPassword,
        oldPassword
      }
    );
    return user;
  }

  /**
   * 更新用户手机号
   * @param phone 新手机号
   * @param phoneCode 新手机号的验证码
   * @param oldPhone 旧手机号
   * @param oldPhoneCode 旧手机号的验证码
   */
  async updatePhone(
    phone: string,
    phoneCode: string,
    oldPhone?: string,
    oldPhoneCode?: string
  ): Promise<User> {
    const { updatePhone: user } = await updatePhone(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        phone,
        phoneCode,
        oldPhone,
        oldPhoneCode
      }
    );
    return user;
  }

  /**
   * 更新用户邮箱
   * @param email 新邮箱
   * @param emailCode 新邮箱的验证码
   * @param oldEmail 旧邮箱
   * @param oldEmailCode 旧邮箱的验证码
   */
  async updateEmail(
    email: string,
    emailCode: string,
    oldEmail?: string,
    oldEmailCode?: string
  ): Promise<User> {
    const { updateEmail: user } = await updateEmail(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        email,
        emailCode,
        oldEmail,
        oldEmailCode
      }
    );
    return user;
  }

  async refreshToken(): Promise<RefreshToken> {
    this.checkLoggedIn();
    const { refreshToken: data } = await refreshToken(
      this.graphqlClientV2,
      this.tokenProvider,
      {}
    );
    return data;
  }

  async bindPhone(phone: string, phoneCode: string): Promise<User> {
    const { bindPhone: user } = await bindPhone(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        phone,
        phoneCode
      }
    );
    return user;
  }

  async unbindPhone(): Promise<User> {
    const { unbindPhone: user } = await unbindPhone(
      this.graphqlClientV2,
      this.tokenProvider,
      {}
    );
    return user;
  }

  /**
   * @description 获取当前登录的用户信息
   *
   */
  async currentUser(): Promise<User | null> {
    try {
      const { user: data } = await user(
        this.graphqlClientV2,
        this.tokenProvider,
        {}
      );
      this.tokenProvider.setUser(data);
      return data;
    } catch {
      return null;
    }
  }

  /**
   * @description 设置当前用户，适合社会化登录手动 set 的接口
   *
   */
  async setCurrentUser(user: User) {
    this.tokenProvider.setUser(user);
  }

  /**
   * @description 退出登录，清空 localStorage 里的 user 和 token
   *
   */
  async logout() {
    const user = this.checkLoggedIn();
    if (this.options.appDomain) {
      const logoutUrl = `${this.options.appDomain}/cas/logout`;
      await this.httpClient.request({
        method: 'GET',
        url: logoutUrl,
        withCredentials: true
      });
    }
    await updateUser(this.graphqlClientV2, this.tokenProvider, {
      id: user.id,
      input: {
        tokenExpiredAt: '0'
      }
    });
    this.tokenProvider.clearUser();
  }

  async udv() {
    const user = this.checkLoggedIn();
    const { udv: list } = await udv(this.graphqlClientV2, this.tokenProvider, {
      targetType: UdfTargetType.User,
      targetId: user.id
    });
    return list;
  }

  async setUdv(key: string, value: any) {
    const user = this.checkLoggedIn();
    value = JSON.stringify(value);
    const { setUdv: list } = await setUdv(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        targetType: UdfTargetType.User,
        targetId: user.id,
        key,
        value
      }
    );
    return list;
  }

  async removeUdv(key: string) {
    const user = this.checkLoggedIn();
    const { removeUdv: list } = await removeUdv(
      this.graphqlClientV2,
      this.tokenProvider,
      {
        targetType: UdfTargetType.User,
        targetId: user.id,
        key
      }
    );
    return list;
  }
  /**
   * @name linkAccount
   * @name_zh 关联账号
   * @description 将社交账号绑定到主账号（手机号、邮箱账号）。
   *
   * @param {Object} options
   * @param {string} options.primaryUserToken 主账号 Token
   * @param {string} options.secondaryUserToken 社交账号 Token
   *
   * @example
   *
   * authenticationClient.linkAccount({ primaryUserToken: '', secondaryUserToken: '' })
   *
   * @returns {{code: 200, message: "绑定成功"}}
   * @memberof AuthenticationClient
   */
  async linkAccount(options: {
    primaryUserToken: string;
    secondaryUserToken: string;
  }): Promise<{ code: number; message: string }> {
    await this.httpClient.request({
      method: 'POST',
      url: `${this.options.host}/api/users/link`,
      data: {
        primaryUserToken: options.primaryUserToken,
        secondaryUserToken: options.secondaryUserToken
      }
    });
    return { code: 200, message: '绑定成功' };
  };

  async unlinkAccount(options: {
    token: string;
    provider: string;
    openid: string
  }): Promise<{ code: number; message: string }> {
    await this.httpClient.request({
      method: 'POST',
      url: `${this.options.host}/api/users/unlink`,
      data: {
        token: options.token,
        openid: options.openid,
        provider: options.provider
      }
    });
    return { code: 200, message: '绑定成功' };
  }

  async getEnableSocialLogin(): Promise<{ code: number; data: string[] }> {
    const data = await this.httpClient.request({
      method: 'POST',
      url: `${this.options.host}/api/social/getEnableSocialLogin`,
    });
    return { code: 200, data: data };
  }
}


