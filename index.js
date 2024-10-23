const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const port = 8080;

app.use(express.static(path.join(__dirname, 'public')));


router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log('Shopping app listening on port 8080!')
})