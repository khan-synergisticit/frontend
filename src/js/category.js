$(function(){
  

})

async function getCategoryNames() {
  $.ajax({
    url: "http://192.168.1.235:8060/api/category/public/names",
    type: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      }, 
    success: function(data, status, xhr){
      console.log("Category Data: " + JSON.stringify(data))
      data.forEach(appli => {
        $("#category-list").append('<li><a class="dropdown-item">' + appli + '</a></li>');
      })
      
      // console.log("status: " + JSON.stringify(status))
      // console.log("xhr: " + JSON.stringify(xhr))
    }
  }).fail(function(error){
    console.log("Category err: " + JSON.stringify(error))
  })
}