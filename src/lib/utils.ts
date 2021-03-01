import crypto from 'crypto';
import { SDK_VERSION } from './version';
import { GraphQLClient } from 'graphql-request';
import { Variables } from 'graphql-request/dist/src/types';
import _ from 'lodash';
import * as jwt from 'jsonwebtoken';

export const encrypt = async (plainText: string, publicKey: string) => {
  // jsencrypt 库在加密后使用了base64编码,所以这里要先将base64编码后的密文转成buffer
  const pawBuffer = Buffer.from(plainText);
  const encryptText = crypto
    .publicEncrypt(
      {
        key: Buffer.from(publicKey), // 如果通过文件方式读入就不必转成Buffer
        padding: crypto.constants.RSA_PKCS1_PADDING
      },
      pawBuffer
    )
    .toString('base64');
  return encryptText;
};

export const graphqlRequest = async (options: {
  endpoint: string;
  query: string;
  variables?: Variables;
  token?: string;
}) => {
  const { endpoint, query, token, variables } = options;
  let headers: any = {
    'x-authing-sdk-version': SDK_VERSION
  };
  token && (headers.Authorization = `Bearer ${token}`);
  const graphQLClient = new GraphQLClient(endpoint, {
    headers
  });

  // 这一步可能会报错
  const data = await graphQLClient.request(query, variables);
  return data;
};

export default function buildTree(nodes: any[]) {
  /* nodes structure
  [
    {"id": "1", "children": ["2"], "root": true},
    {"id": "2", "children": ["3", "4"], "root": false},
    {"id": "3", "children": [], "root": false},
    {"id": "4", "children": [], "root": false},
  ]

  转换成 ->
  {
    id: 1,
    children: [
      {
        id: 2,
        children: [
          {
            id: 3,
            children: []
          },
          {
            id: 4,
            children: []
          }
        ]
      }
    ]
  }
  */
  const rootNodes = [_.find(nodes, { root: true })];
  const mapChildren = (childId: any) => {
    const node = _.find(nodes, x => x.id === childId) || null;
    if (_.isArray(node.children) && node.children.length > 0) {
      node.children = node.children
        .map(mapChildren)
        .filter((node: any) => node !== null);
    }
    return node;
  };
  const tree = rootNodes.map(node => {
    node.children = node.children
      .map(mapChildren)
      .filter((node: any) => node !== null);
    return node;
  });
  return tree[0];
}

/**
 * @description 验证 jwt token
 *
 */
export const verifyToken = (token: string, secret: string) => {
  const decoded = jwt.verify(token, secret) as any;
  return decoded;
};


export const popupCenter = (
  url: string,
  { w, h }: { w: number; h: number } = { w: 585, h: 649 }
) => {
  // Fixes dual-screen position                             Most browsers      Firefox
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  const newWindow = window.open(
    url,
    '_blank',
    `
      toolbar=no,
      menubar=no,
      scrollbars=no,
      resizable=no,
      location=no,
      status=no
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
      `
  );

  newWindow?.focus();
};


export const objectToQueryString = (queryParameters: {
  [x: string]: string;
}) => {
  return queryParameters
    ? Object.entries(queryParameters).reduce((queryString, [key, val]) => {
      const symbol = queryString.length === 0 ? '?' : '&';
      queryString += typeof val === 'string' ? `${symbol}${key}=${val}` : '';
      return queryString;
    }, '')
    : '';
};