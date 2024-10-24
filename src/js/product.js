$(function(){
  $.ajax({
    url: "http://192.168.1.235:8060/api/product/all",
    type: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      }, 
    success: function(data, status, xhr){
      console.log("Data: " + JSON.stringify(data))
      console.log("status: " + JSON.stringify(status))
      console.log("xhr: " + JSON.stringify(xhr))
    }
  }).fail(function(error){
    console.log("err: " + JSON.stringify(error))
  })
})





// async function fetchProducts() {
//   var url = "http://192.168.1.235:8060/api/product/all";
  
//   const product = await fetch(url, {
//   method: "GET",
//   mode: "no-cors",
//   })

//   return product;
// }