import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import NodeCache from 'node-cache';
import {parse, stringify, toJSON, fromJSON} from 'flatted';
const userCache = new NodeCache();
const app = express();
const router = express.Router();
const userRouter = express.Router();
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
const paths = __dirname + '/src/';

import { randomUUID } from 'crypto';

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

userRouter.post("/logout", (req, res)=>{
  console.log("req: " + stringify(req))
  console.log("res: " + stringify(res))

})
userRouter.post("/user", (req, res) => {
  let code = JSON.parse(req.rawHeaders[5])
  
  console.log(code)
  const key = randomUUID();
  let success = userCache.set(key, code);
  if(success){
    var url = "http://192.168.1.76:8090/api/user/find";

    console.log("code.tokenValue: " + code.tokenValue + ", key: " + key);
    fetchUser(code.tokenValue)
    .then((data) => {
      data.sessionId = key;
      console.log("Data1: " + JSON.stringify(data))
      app.get('/data', (request, response) =>{

        response.json(data)
      })
      
    })
  }
  res.send('Data received successfully');
})


app.use("/", express.static(__dirname + '/src'))
app.use("/admin", express.static(__dirname + '/src'))
app.use('/', router)
app.use('/api', userRouter)
app.listen(port, function () {
  console.log('Shopping app listening on port 8080!')
})


async function fetchUser(token) {
  var url = "http://192.168.1.76:8090/api/user/find";

  console.log("fetching user...")
  if(token !== null){
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        return await response.json();
  }
}

async function logout(data){
  var url = "http://192.168.1.76:8090/logout";
  const key = data.sessionId;
  const code = userCache.get(key);


  await fetch(url, {
  method: "GET",
  credentials: "include",
  mode: "no-cors",
  headers: {
    "Authorization": "Bearer " + code.tokenValue,
     'Content-Type': 'application/x-www-form-urlencoded'
  }
  }).then((data)=>{
    console.log("logout: " + JSON.stringify(data));
    userCache.del(key);
  })
}
