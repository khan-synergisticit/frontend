const express = require('express');
const path = __dirname + '/static/';
const cors = require('cors');
const app = express();
const router = express.Router();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(cors());
const port = 8080;
router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});
router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});

app.get('/', function (req, res) {
  console.log('Cookies: ', req.cookies)

  console.log('Signed Cookies: ', req.signedCookies)
})


app.use(express.static(path))
app.use('/', router)
app.listen(port, function () {
  console.log('Shopping app listening on port 8080!')
})