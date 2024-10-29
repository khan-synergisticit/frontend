$(function(){
  

    $.ajax({
      url: "/api/product/categories",
      type: "GET",
      success: function(data, status, xhr){
        console.log("Category Data: " + JSON.stringify(data))
        var categoryList = $("#categoryList");
        var productCategory = $("#productCategory");
        $.each(data, function(idx, d){          
          categoryList.append('<li id=' + idx + '>' + d + '</li>');
          productCategory.append('<option value='+ d + '>' + d + '</option>');
         })
        
        // for( let i = 0; i < data.length; i++){
        //   $("#category-list").append("<li>").text(data[i]);
        //   $("#productCategory").append("<option></option>").val(data[i]).html(data[i]);
        // }
        
        
        // console.log("status: " + JSON.stringify(status))
        // console.log("xhr: " + JSON.stringify(xhr))
      }
    }).fail(function(error){
      console.log("Category err: " + JSON.stringify(error))
    })
})

// async function getCategoryNames() {
//   $.ajax({
//     url: "http://192.168.1.235:8060/api/category/public/names",
//     type: "GET",
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       }, 
//     success: function(data, status, xhr){
//       console.log("Category Data: " + JSON.stringify(data))
//       for( let i = 0; i < data.length; i++){
//         $("#category-list").append('<li><a class="dropdown-item">' + data[i] + '</a></li>');
//         console.log("data: " + data[i]);
//       }
      
      
//       // console.log("status: " + JSON.stringify(status))
//       // console.log("xhr: " + JSON.stringify(xhr))
//     }
//   }).fail(function(error){
//     console.log("Category err: " + JSON.stringify(error))
//   })
// }