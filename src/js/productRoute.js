import express from 'express';
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import {userCache} from './userRoute.js'


const productRouter = express.Router();

productRouter.use(express.urlencoded({
  extended: false
}));
productRouter.use(express.json());

productRouter.get("/all", function(req, res){
  fetchAllProduct()
  .then((data)=>{
    console.log("product res: " + JSON.stringify(data))
    res.json(data);
  })
})

productRouter.get("/categories", function(req, res){
  fetchAllCategories()
  .then((data)=>{
    console.log("categories: " + JSON.stringify(data))
    res.json(data);
  })
})

productRouter.post("/newProduct", function(req, res){
  console.log("product req: " + req)
  let obj = toJSON(req)
  let data = obj[15]
  let firstKey = Object.keys(data)[0]
  firstKey = JSON.parse(firstKey)
  addProduct(firstKey)
  .then((data)=>{
    if(data !== undefined){
      res.success = (data, metadata = {}, links = {}) => {
        res.status(200).json({
          status: "success",
          data,
          metadata,
          links
        });
      };
     // console.log("data: " + JSON.stringify(data))
    }
    
    
  })

})

async function fetchAllProduct() {
  const url = "http://192.168.1.235:8060/api/product/public/all";
  const response = await fetch(url, {
    method: "GET",
    
    headers: {
      "Access-Control-Allow-Origin": "*",
      }
    })
      return await response.json();
}

async function addProduct(data) {
  let sessionId = String(data.sessionId);
  let product = data.product;
  console.log("sessionId: " + sessionId)
  console.log("product: " + JSON.stringify(product))

  var url = "http://192.168.1.235:8060/api/product/private";
  let token = userCache.get(sessionId);
  token = JSON.parse(token);
  console.log("token: " + token)
  console.log("token.tokenValue: " + token.tokenValue)
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Authorization": "Bearer " + token.tokenValue,
      "Content-Type": "application/json"
      }
    })
      return await response.json();
}

async function fetchAllCategories() {
  const url = "http://192.168.1.235:8060/api/category/public/names";

  const response = await fetch(url, {
    method: "GET",
  
    headers: {
      "Access-Control-Allow-Origin": "*",
      }
    })
      return await response.json();
  
}

export default productRouter;