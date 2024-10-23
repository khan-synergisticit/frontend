import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const router = express.Router();
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
const paths = __dirname + '/public/';

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
});



app.use(express.static(path))
app.use('/', router)
app.listen(port, function () {
  console.log('Shopping app listening on port 8080!')
})