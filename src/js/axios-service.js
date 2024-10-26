import  axios  from 'axios'

const axiosInstance = axios.create({
  timeout: 1000,
})

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log("request: " + JSON.stringify(config))
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})
axios.interceptors.response.use(function (response) {
  console.log("axios response: " + JSON.stringify(response))
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export {
  axiosInstance
}