import { HttpClient } from '../common/HttpClient';
import { GraphqlClient } from '../common/GraphqlClient';
import { AuthenticationTokenProvider } from './AuthenticationTokenProvider';

/**
 * 初始化 AuthenticationClientOptions 的参数
 */
export interface AuthenticationClientOptions {
  /** 用户池 ID **/
  userPoolId?: string;
  /** 应用 ID */
  appId?: string;
  /** 应用域名，如 https://sample-app.authing.cn */
  appDomain?: string;
  /** 请求超时时间 **/
  timeout?: number;
  /** 错误回调函数, 默认为 (err: Error) => { throw err } 直接抛出报错 **/
  onError?: (code: number, message: string) => void;
  /** 密码传输加密公钥 */
  encrptionPublicKey?: string;
  /** Authing 服务器地址 */
  host?: string;
  /** 请求来源 */
  requestFrom?: string;
  /** token */
  accessToken?: string;
  /** 加密函数 */
  encryptFunction?: (plainText: string, publicKey: string) => Promise<string>;
  httpClient?: typeof HttpClient;
  graphqlClient?: typeof GraphqlClient;
  tokenProvider?: typeof AuthenticationTokenProvider;
}

export interface CheckLoginStatusRes {
  status: boolean;
  code: number;
  message: string;
  token: {
    data: {
      email?: string;
      id: string;
      clientId?: string;
      unionid?: string;
    };
    iat: number;
    exp: number;
  };
}

export interface QRCodeUserInfo {
  nickname: string;
  photo: string;
  id?: string;
  email?: string;
  emailVerified?: boolean;
  unionid?: string;
  openid?: string;
  oauth?: string;
  registerMethod?: string;
  username?: string;
  company?: string;
  token?: string;
  phone?: string;
  tokenExpiredAt?: string;
  loginsCount?: number;
  lastIP?: string;
  signedUp?: string;
  blocked?: boolean;
  isDeleted?: boolean;
}

export interface QRCodeStatus {
  random: string;
  /** 二维码状态: 0 - 未使用, 1 - 已扫码, 2 - 已授权, 3 - 取消授权, -1 - 已过期 */
  status: number;
  ticket?: string;
  userInfo?: QRCodeUserInfo;
}

export interface QRCodeGenarateResult {
  random: string;
  url: string;
}
