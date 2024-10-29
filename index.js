import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {userRouter} from './src/js/userRoute.js';
import productRouter from './src/js/productRoute.js';

const app = express();
const router = express.Router();
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
const paths = __dirname + '/src/';


app.use("/", express.static(__dirname + '/src'))
app.use("/admin", express.static(__dirname + '/src'))
app.use('/', router)
app.use('/api/user', userRouter) 
app.use('/api/product', productRouter) 


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








app.listen(port, function () {
  console.log('Shopping app listening on port 8080!')
})







