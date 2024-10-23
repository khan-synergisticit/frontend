import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
const router = express.Router();
const path = __dirname + '/static/';


app.use(cookieParser());

app.use(cors());
const port = 8080;
router.use(function (req,res,next) {
  console.log('/' + req.method);
  console.log("req: " + JSON.stringify(req.cookies))
  console.log("res: " + JSON.stringify(res.header))
  next();
});
router.get('/', function(req,res){
  res.sendFile(path + 'index.html');
});



app.use(express.static(path))
app.use('/', router)
app.listen(port, function () {
  console.log('Shopping app listening on port 8080!')
})