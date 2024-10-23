const express = require('express');
const path = __dirname + '/static/';
const cors = require('cors');
const app = express();
const axios = require('axios');
const router = express.Router();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(cors());
const port = 8080;
router.use(function (req,res,next) {
  console.log('/' + req.method);
  console.log("req: " + JSON.stringify(req.cookies))
  console.log("res: " + JSON.stringify(res.header))
  console.log("next: " + JSON.stringify(resnext))
  next();
});
router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  console.log("request: " + JSON.stringify(config))
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
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

app.use(express.static(path))
app.use('/', router)
app.listen(port, function () {
  console.log('Shopping app listening on port 8080!')
})