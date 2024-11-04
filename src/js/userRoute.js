import express from 'express';
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import NodeCache from 'node-cache';
import {randomUUID } from 'crypto'
import { AUTH_CLIENT_URL } from './constants.js';


const userCache = new NodeCache();
const userRouter = express.Router();
userRouter.use(express.urlencoded({
  extended: false
}));
userRouter.use(express.json());


userRouter.post("", (req, res) => {
  let header = req.rawHeaders;
  let code = JSON.parse(req.rawHeaders[5])
  for(let i = 0; i < header.length; i++){
    console.log("user: " + header[i])
  }
  
  console.log(code)
  const key = code.sessionId;
  let success = userCache.set(key, JSON.stringify(code));
  if(success){
    console.log("code.tokenValue: " + code.tokenValue + ", key: " + key);
    fetchUser(code.tokenValue)
    .then((data) => {
      data.sessionId = key;
      
      userRouter.get('/data', (request, response) =>{
        console.log("Data1: " + JSON.stringify(data))
        response.status(200).json(data)
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
  var url = AUTH_CLIENT_URL + "/api/user/find";

  console.log("fetching user...")
  if(token !== null){
    return await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(response => response.json())
      .catch(error => console.log("fetch user error: " + error))
      .then(data => {
        return data;
      })
  }
}

async function logout(key){
  var url = AUTH_CLIENT_URL + "/logout";

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
