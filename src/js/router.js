import express from "express"
import { AUTH_CLIENT_URL, FRONTEND_URL } from "./constants.js";

const router = express.Router();


router.use(function (req,res,next) {
  
  next();
});



router.get("/login", async function(req, res){
  res.redirect(AUTH_CLIENT_URL + "/login")
})

router.get("/loggedIn", async function(req, res){
  res.redirect(FRONTEND_URL)
})

export {
  router
}