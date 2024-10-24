async function fetchProducts() {
  var url = "http://192.168.1.235:8060/api/product/all";
  
  await fetch(url, {
  method: "GET",
  credentials: "include",
  mode: "no-cors",
  headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
  }
  }).then((data)=>{
    console.log("Products: " + JSON.stringify(data));
  })
}