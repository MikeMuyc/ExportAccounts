/**
 * @func 组件基础配置
 */

import { message as Message, Modal } from 'antd';
// import sso from './sso';

export const getParam = (name, urls) => {
  const url = decodeURI(urls || window.location.href);

  let value = {};
  let startIndex = url.indexOf('?');

  let temp;
  if (startIndex + 1 > 0) {
    startIndex += 1;
    const param = url.substr(startIndex).split('&');

    param.forEach((val) => {
      temp = val.split('=');
      value[`${temp[0]}`] = `${temp[1]}`;
    });
  }
  if (typeof name === 'string' && name) {
    temp = value[name];

    value = temp !== undefined ? temp : '';
  }
  return value;
};

const accountToken = getParam('exid', `/${window.location.search}`);
const businessDomainCode = getParam('businessDomainCode', `/${window.location.search}`);
const tenantTypeCode = getParam('tenantTypeCode', `/${window.location.search}`);

const addList = {
  _id: accountToken,
  businessDomainCode,
  tenantTypeCode,
};

export const getNewUrl = (urls) => {
  const newUrl =
    window.location.host.indexOf('.jss.com.cn') !== -1
      ? urls.replace('.nuonuo.com', '.jss.com.cn')
      : urls.replace('.jss.com.cn', '.nuonuo.com');
  return newUrl;
};
function successStatusFn(res, { successMsg }) {
  successMsg && Message.success(successMsg);
}

Message.config({
  duration: 3,
  maxCount: 3,
});
// 兼容迁移项目中不需要accountToken
export const requestConfig = {
  name: 'status',
  value: '200',
  ext: '.do',
  query: {
    ...addList,
  },
  status: {
    200: successStatusFn,
    201: () => {},
    301: ({ message }) => {
      Modal.warning({
        content: message,
        okText: '我知道了',
      });
    },
    '^300': ({ message }) => {
      Message.error(message);
    },
    500: ({ message }) => {
      Message.error(message);
    },
    405: ({ message }) => {
      Message.error(message);
    },
  },
  preurl(url) {
    if (/^(https?:)?\/\//.test(url)) {
      return '';
    }
    // 旧项目
    if (/^(jz)\//.test(url)) {
      return '/';
    }
    // 代账
    if (/^(accinfo|instead|clouduser|helpcenter)\//.test(url)) {
      return '/';
    }
    return '/jz/accounting/';
  },
  intercept({ status, url }) {
    // 拦截处理
    if (status) {
      if (+status === 308 && (url || this.url).indexOf('sso/login') === -1) {
        // sso(addList);
        console.log('被拦截了');
      }
    }
  },
};
