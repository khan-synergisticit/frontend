import express from 'express'
import cookieParser from 'cookie-parser';
import CircularJSON from 'circular-json';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const router = express.Router();
const userRouter = express.Router();
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
const paths = __dirname + '/src/';
const adminPaths = paths + 'admin'
import {axiosInstance} from './src/js/axios-service.js';

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
  res.sendFile(paths + 'index.html');
  console.log(JSON.stringify("Header: " + res.header));
});

router.get('/admin', function(req,res){
  res.sendFile(paths + 'index.html');
  console.log(JSON.stringify("Header: " + res.header));

});


userRouter.post("/user", (req, res) => {
  console.log("req1: " + CircularJSON.stringify(req))
  console.log("req2: " + CircularJSON.stringify(req))

  console.log("res1: " + CircularJSON.stringify(res))
  res.send('Data received successfully');
})


app.use("/", express.static(__dirname + '/src'))
app.use("/admin", express.static(__dirname + '/src'))
app.use('/', router)
app.use('/api', userRouter)
app.listen(port, function () {
  console.log('Shopping app listening on port 8080!')
})
