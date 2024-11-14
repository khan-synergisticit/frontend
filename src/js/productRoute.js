import express from 'express';
import {parse, stringify, toJSON, fromJSON} from 'flatted';
import {userCache} from './userRoute.js'
import { SHOPPING_URL } from './constants.js';


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
  const url = SHOPPING_URL + "/api/product/public/all";
  
  return await fetch(url, {
    method: "GET",
    headers: {
     "Access-Control-Allow-Origin": "*",
      }
    })
    .then(response => response.json())
    .catch(error => console.log("fetch product error: " + error))
    .then(data => {
      return data;
    })
 
}

async function addProduct(data) {
  let sessionId = String(data.sessionId);
  let product = data.product;
  console.log("sessionId: " + sessionId)
  console.log("product: " + JSON.stringify(product))

  var url = SHOPPING_URL + "/api/product/private";
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
  const url = SHOPPING_URL + "/api/category/public/names";

  return await fetch(url, {
    method: "GET",
    headers: {
     "Access-Control-Allow-Origin": "*",
      }
    })
    .then(response => response.json())
    .catch(error => console.log("fetch category error: " + error))
    .then(data => {
      return data;
    })
  
}

export default productRouter;