import axios from 'axios';
import appConfig from '../appConfig';


axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('%c AJAX response error: ' + error.response.status, 'color: red');
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('%c AJAX request error:', 'color: red');
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('%c AJAX unknown error: ' + error.message, 'color: red');
  }
  console.log(error.config);

  const resp = error.response;
  const customErrorMsg = (resp && resp.data && resp.data.error) ?
    'Server error: ' + resp.data.error : (resp.statusText || 'Unknown error');
  console.log ('%c Custom error msg = ' + customErrorMsg, 'color: orange');
  error.customErrorMsg = customErrorMsg;

  return Promise.reject(error);

});

export const createApi = (httpMethod, url,
                          {
                            urlData = false,
                            inputData = (payload) => payload,
                            outputData = (response) => response,
                          } = {}
) => {
  return (token, payload, ...args) => {
    let requestUrl = url;
    if (typeof urlData === 'function') {
      const urlParams = urlData(payload, ...args);
      console.log('%c urlParams=' + JSON.stringify(urlParams), 'color: green');
      requestUrl = url.replace(/\{(.*?)\}/g, function (match, field) {
        return urlParams[field];
      });
    }

    let axiosOptions = {
      method: httpMethod,
      url: appConfig.apiUrl + requestUrl,
      responseType: 'json',
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json'
      },
      transformResponse: [outputData]
    };

    if (httpMethod === 'GET') {
      axiosOptions.params = inputData(payload);
    } else {
      axiosOptions.data = inputData(payload);
    }

    return axios(axiosOptions);
  }
};