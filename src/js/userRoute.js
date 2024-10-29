import express from 'express';
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import NodeCache from 'node-cache';
import {randomUUID } from 'crypto'


const userCache = new NodeCache();
const userRouter = express.Router();
userRouter.use(express.urlencoded({
  extended: false
}));
userRouter.use(express.json());


userRouter.post("", (req, res) => {
  let code = JSON.parse(req.rawHeaders[5])
  
  console.log(code)
  const key = randomUUID();
  let success = userCache.set(key, JSON.stringify(code));
  if(success){
    console.log("code.tokenValue: " + code.tokenValue + ", key: " + key);
    fetchUser(code.tokenValue)
    .then((data) => {
      data.sessionId = key;
      console.log("Data1: " + JSON.stringify(data))
      userRouter.get('/data', (request, response) =>{

        response.json(data)
      })
      
    })
  }
  res.send('Data received successfully');
})



userRouter.get("/logout", function (req, res){
  
  let obj = toJSON(req)
  let sessionId = String(obj[45]); 
  logout(sessionId)
  .then((_)=>{
    console.log("logout: " );
    userCache.del(sessionId);
    res.status(200).json({ message: 'Delivered successfully' });
  })

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

async function logout(key){
  var url = "http://192.168.1.76:8090/logout";

  const code = userCache.get(key);
 console.log("code: " + code)

  if(code != null){
    const result = await fetch(url, {
      method: "GET",
      credentials: "include",
      mode: "no-cors",
      headers: {
        "Authorization": "Bearer " + code.tokenValue,
         'Content-Type': 'application/x-www-form-urlencoded'
      }
      })
      return result;
  } else {
    return " ";
  }
}








export {
  userRouter,
  userCache
}
