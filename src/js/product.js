$(function(){
  $.ajax({
    url: "/api/product/all",
    type: "GET",
    success: function(data, status, xhr){
      console.log("Product Data: " + JSON.stringify(data))
      // console.log("status: " + JSON.stringify(status))
      // console.log("xhr: " + JSON.stringify(xhr))
    }
  }).fail(function(error){
    console.log("Category err: " + JSON.stringify(error))
  })

  $('#addProductBtn').on('click', function(e){
    e.preventDefault();
    let title = $('#productTitle').val();
    let description = $('#productDescription').val();
    let category = $('#productCategory').val();
    let price = $('#productPrice').val();
    let isActive = $('#flexRadioDefault1').is(':checked');
    let stock = $('#productStock').val();
    let image = $('#productImage').val();
    image = image.split(/(\\|\/)/g).pop();
    const sessionId = sessionStorage.getItem("sessionId")
    category = {
      "name": category
    }
    let data = {
      sessionId,
      product:{
        title,
        description,
        category,
        price,
        isActive,
        stock,
        image
      }
    }
    data = JSON.stringify(data)
    saveProduct(data)
    
    console.log("product data: " + data)
    
  })
})

async function saveProduct(data) {
    const url = '/api/product/newProduct';
    const header = {
      "Content-Type": "application/json",
       'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': "GET,POST,OPTIONS,DELETE,PUT",
    }
   return await $.ajax({
      url: url,
      header: header,
      type: "POST",
      data: data,
      dataType: "jsonp",
      success: function(data, status, xhr){
        console.log("success: " + JSON.stringify(data))
      }
    }).fail(function(data){
      console.log("Failed: " + JSON.stringify(data))
    })
}



// async function fetchProducts() {
//   var url = "http://192.168.1.235:8060/api/product/all";
  
//   const product = await fetch(url, {
//   method: "GET",
//   mode: "no-cors",
//   })

//   return product;
// }