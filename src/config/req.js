import axios from 'axios';
import Qs from 'qs'; // qs 在安装 axios 后会自动安装
import { message } from 'antd';
import { requestConfig } from './config';

const { ext, preurl, query, intercept, status: statusConfig } = requestConfig;

const initialConfig = {
  type: 'get',
  data: {},
  url: '',
};

const contentTypeConfig = {
  fd: 'multipart/form-data;charset=UTF-8',
  post: 'application/x-www-form-urlencoded; charset=UTF-8',
  json: 'application/json',
};

const encodeURIFunction = (data) => Qs.stringify(data);

// 根据请求方法设置 method、content-type、数据处理函数
const resolveReqType = (type) => {
  // 处理 postJSON 方法
  let method = '';
  let contentType = contentTypeConfig.post;
  let formatData = encodeURIFunction;

  if (type.toLowerCase() === 'postjson') {
    method = 'post';
    contentType = contentTypeConfig.json;
    formatData = (data) => JSON.stringify(data);
  }

  // 处理 文件上传 formdata
  if (type === 'fd') {
    method = 'post';
    contentType = contentTypeConfig.fd;
    formatData = (data) => data;
  }
  return {
    method,
    contentType,
    formatData,
  };
};

// URL 添加前缀或 .do
const formatUrl = (url) => {
  const URL = preurl(url) + url;
  return URL.indexOf('.do') === -1 ? URL + ext : URL;
};

const formatUrlWithData = (url, data) => {
  const resUrl = formatUrl(url);
  const paramsStr = Qs.stringify(data, {
    arrayFormat: 'brackets',
  });
  return `${resUrl}?${paramsStr}`;
};

/**
 * @param {Object} config
 * @param {String} config.url - request url
 * @param {String} config.type - request method(post, get, postJSON, sync)
 * @param {String} config.headers - axios headers
 * @param {Boolean} config.returnAll - return res (default: res.data)
 * @param {Function} config.status - status 对应执行的函数，一般用于全局错误提示等，public/config.js 中配置
 * axios config docs: http://www.axios-js.com/docs/#Request-Config
 */
const req = async (config = initialConfig) => {
  const {
    url,
    type,
    headers,
    status: customStatusConfig,
    errMsg,
    successMsg,
    returnAll,
    // 去除 accountToken 参数
    disabledAccountToken,
    ...otherConfig
  } = config;

  const { method, contentType, formatData } = resolveReqType(type);

  const URL = formatUrl(url);
  // config 中请求全局配置中的通用参数
  const { accountToken, ...otherQuery } = query;

  const querys = { ...otherQuery, _: new Date().getTime() };
  if (!disabledAccountToken) querys.accountToken = accountToken;

  const axiosConfig = {
    ...otherConfig,
    url: URL,
    method: method || type, // 适配其他 method
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      ...headers,
    },
    params: type === 'get' ? { ...querys, ...config.data } : querys, // 请求参数 url 参数
    withCredentials: true,
    transformRequest: [formatData],
  };

  // get 请求 encode 参数
  if (type === 'get') {
    axiosConfig.paramsSerializer = (params) => {
      return Qs.stringify(params, {
        arrayFormat: 'brackets',
      });
    };
  }

  // axios
  let res = null;
  try {
    res = await axios.request(axiosConfig);
  } catch (err) {
    console.log('request error:', err);
  }
  // 处理 404 等请求本身错误
  if (!res) {
    const msg = '请求失败';
    message.error(msg);
    return Promise.reject(msg);
  }

  // 后端返回数据
  const resData = res && res.data;
  const { status, result } = resData;

  // 登录状态验证 intercept
  const testRes = intercept({ ...resData, url: URL });
  if (testRes === false) {
    const msg = '请求失败';
    return Promise.reject(msg);
  }

  // 自定义 statusFn 执行
  const STATUS_CONFIG = { ...statusConfig, ...customStatusConfig };
  const statusConfigKeys = Object.keys(STATUS_CONFIG);
  let statusFn = null;

  statusConfigKeys.forEach((key) => {
    if (new RegExp(key).test(`${status}`)) {
      statusFn = STATUS_CONFIG[key];
    }
  });

  // 执行 status 对应的自定义或配置的全局函数，如 错误提示
  if (statusFn) {
    statusFn(resData, config);
  }

  // todo 适配代账接口，开发mock使用
  if (!status && result === 'success') {
    return res;
  }

  if (Number(status) !== 200) {
    return Promise.reject(resData);
  }

  return resData;
};

export default req;

export { formatUrl, formatUrlWithData };
