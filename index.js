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
import axios from 'axios';

app.use(cookieParser());

app.use(cors());
const port = 8080;

router.use(function (req,res,next) {
  
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

app.get('/login', (req, res)=>{
  app.get('http://192.168.1.76:8090/login', (request, response)=>{
    console.log("request: " + CircularJSON.stringify(request))
    console.log("response: " + CircularJSON.stringify(response))

  })
})

userRouter.post("/user", (req, res) => {
  let code = CircularJSON.stringify(req.rawHeaders[5]);
  console.log("code: " + code)


  axios.get({
    url: 'http://192.168.1.76:8090/api/user/find',
    header: {
      "Authorization": "Bearer " + code,
      "Content-Type": "application/x-www-form-urlencoded"
      }
  }).then(data=>{
    console.log("Data: " + JSON.stringify(data))
  })
  res.send('Data received successfully');
})


app.use("/", express.static(__dirname + '/src'))
app.use("/admin", express.static(__dirname + '/src'))
app.use('/', router)
app.use('/api', userRouter)
app.listen(port, function () {
  console.log('Shopping app listening on port 8080!')
})
