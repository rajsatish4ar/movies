import _ from 'lodash';
import {ERROR_MSG,NO_INTERNET} from '../const/Strings';
import Root from './Root';
import NetInfo from '@react-native-community/netinfo'
import {IAMGE_URL} from './URLs'
export const defaultConfig = {
  type: 'POST',
  enableLoader: true,
};
function paramsToUrlQueryParams(params) {
  const esc = encodeURIComponent;
  let query = '';
  if (params) {
    query += '?';
    query += Object.keys(params)
      .map((k) => `${esc(k)}=${esc(params[k])}`)
      .join('&');
  }
  return query;
}
export const getHeaders = () => {
  const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return header;
};
 function* request(url, params = {}, config = {}) {
  console.groupCollapsed(url);
  config = {...defaultConfig, ...(_.isObject(config) ? config : {})};
  //    checking internet
  const conn = yield NetInfo.fetch();
  const isConnected = conn?.isConnected
  if (!isConnected) {
    Root.showToast(NO_INTERNET);
    return;
  }

  //  getting header
  const headers = getHeaders();
  const info = {
    method: 'POST',
    headers,
  };

  if (config?.enableLoader) {
    Root.showLoader(true);
  }
  try {
    let query = '';
    if (config?.type == 'POST') {
      info.body = JSON.stringify(params);
    } else if (config?.type == 'GET') {
      info.method = 'GET';
      query = paramsToUrlQueryParams(params);
    }
    console.log('api final url', url + query);
    console.log('api info', url, info);
    const response = yield fetch(url + query, info);
    const res = yield response?.json();
    console.log('api res', url, res);
    console.groupEnd();
    if (config?.enableLoader) {
      Root.hideLoader();
    }
    return res;
  } catch (error) {
    console.log('api error', url, error);
    console.groupEnd();
    Root.showToast(ERROR_MSG);
    if (config?.enableLoader) {
      Root.hideLoader();
    }
    return;
  }
 }

export default request


export const getImageURL=(id,size='w200')=>{
  return IAMGE_URL.concat(size).concat('/').concat(id)
}

