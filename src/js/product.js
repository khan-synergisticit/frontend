$(function(){
  $.ajax({
    url: "/api/product/all",
    type: "GET",
    success: function(data, status, xhr){
      console.log("Product Data: " + JSON.stringify(data))
      $.each(data, function(idx, d){          
        var productCategory = $("#product-card");
        productCategory.append(productBlock(d));
       })
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

let productBlock = (data) =>{
  console.log( " product block " + JSON.stringify(data))
  return   '<div class="col-md-3 mt-2" >' + 
										'<div class="card card-sh">' + 
											'<div class="card-body text-center">' +
												'<img alt="" src="./img/product_img/' + data.imageName + '" width="150px" height="150px"/>'+
												'<p class="fs-5 text-center">' + data.name + '</p>'+
												'<div class="row text-center">' +
													
													
												'</div>' +
											'</div>'+
										'</div>'+
									'</div>'
}

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