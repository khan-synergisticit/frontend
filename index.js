import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {userRouter} from './src/js/userRoute.js';
import productRouter from './src/js/productRoute.js';
import { AUTH_CLIENT_URL, FRONTEND_URL } from './src/js/constants.js';
const app = express();
const router = express.Router();
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
const paths = __dirname + '/src/';





app.use(cors());


const port = 8080;



router.get("/login", async function(req, res){
  res.redirect(AUTH_CLIENT_URL + "/login")
})

router.get("/loggedIn", async function(req, res){
  res.redirect(FRONTEND_URL + "?success")
})

router.get('/', function(req,res){
  res.sendFile(paths + 'index.html');
  console.log(JSON.stringify("Header: " + res.header));
});

router.get('/admin', function(req,res){
  res.sendFile(paths + 'index.html');
  console.log(JSON.stringify("Header: " + res.header));

});

app.use('/', router)
app.use('/api/user', userRouter) 
app.use('/api/product', productRouter) 

app.use("/", express.static(__dirname + '/src'))
app.use("/admin", express.static(__dirname + '/src'))


app.listen(port, function () {
  console.log('Shopping app listening on port 8080!')
})




export {
  paths, 
  
}




