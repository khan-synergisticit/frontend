import express from 'express';
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import NodeCache from 'node-cache';
import { AUTH_CLIENT_URL, FRONTEND_BASE, COOKIE_KEY } from './constants.js';
import cookie from 'cookie';

const userCache = new NodeCache();
const userRouter = express.Router();
userRouter.use(express.urlencoded({
  extended: false
}));
userRouter.use(express.json());

userRouter.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


userRouter.post("", (req, res) => {
  let header = req.rawHeaders;
  let code = JSON.parse(req.rawHeaders[5])
  for(let i = 0; i < header.length; i++){
    console.log("user: " + header[i])
  }
  
  console.log(code)
  const sessionId = code.sessionId;
  let success = userCache.set(sessionId, JSON.stringify(code));
  if(success){
    console.log("code.tokenValue: " + code.tokenValue + ", sessionId: " + sessionId);
    fetchUser(code.tokenValue)
    .then((data) => {
      data.sessionId = sessionId;
      
      userRouter.get('/data', (request, response) =>{
        console.log("Data1: " + JSON.stringify(data))
        response.setHeader(
          "Set-Cookie",
          cookie.serialize(COOKIE_KEY, sessionId, {
            httpOnly: true,
            maxAge: 60 * 60, // 1 week,
            domain: FRONTEND_BASE,
            path: "/"
          }),
        );
        response.status(200).json(data)
      })
      
    })
  }
  res.send('Data received successfully');
})



userRouter.get("/logout", function (req, res){

  var cookies = cookie.parse(req.headers.cookie || "");
  let key = cookies.JSESSIONID;
  let code = userCache.get(key)
  code = JSON.parse(code)
  console.log("cookies: " + cookies.JSESSIONID)
  console.log("code.tokenValue: " + code.tokenValue)
  res.set({
    'Authorization': "Bearer " + code.tokenValue,
  });
  let obj = toJSON(req)
  for(let i = 0; i < obj.length; i++){
    console.log(i + " logout: " + stringify(obj[i]))
  }
  // let sessionId = String(obj[45]); 
  // res.setHeader
  res.redirect(AUTH_CLIENT_URL + "/logout")
  // logout(sessionId)
  // .then((_)=>{
  //   console.log("logout: " );
  //   userCache.del(sessionId);
  //   res.session = null;
  //   res.clearCookie(COOKIE_KEY);
  //   res.status(200).json({ message: 'Delivered successfully' });
  // })

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
