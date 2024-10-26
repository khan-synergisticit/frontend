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
  let code = CircularJSON.stringify(req.rawHeaders[5])

  console.log("code1: " + code)
  app.get('/api/user', (request, response) => {
    const data = {code: code}
    response.json(data)
  })
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
  console.log("res1: " + CircularJSON.stringify(req.rawHeaders[5]))
  let code = CircularJSON.stringify(req.rawHeaders[5])
  console.log("code: " + code)
  res.send('Data received successfully');
})


app.use("/", express.static(__dirname + '/src'))
app.use("/admin", express.static(__dirname + '/src'))
app.use('/', router)
app.use('/api', userRouter)
app.listen(port, function () {
  console.log('Shopping app listening on port 8080!')
})
