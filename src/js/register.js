const AUTH_CLIENT_URL="http://localhost:8090"

$(function(){
  $("#userRegister").on("submit", function(e){
    e.preventDefault();
      let name = $("#name").val();
      let mobileNumber = $("#mobileNumber").val();
      let email = $("#email").val();
      let address = $("#address").val();
      let city = $("#city").val();
      let state = $("#state").val();
      let pincode = $("#pincode").val();
      let pass = $("#pass").val();
      let img = $("#img").val();
          img = img.split(/(\\|\/)/g).pop();
      let data = {
        name,
        mobileNumber,
        email,
        address,
        city,
        state,
        pincode,
        pass,
        img
      };

      console.log(data);
      saveRegistration(data).then((data) => {

        alert("Registration successful, id: " + data.id)
        window.location.replace("/index.html")
      }).catch((error)=>{
        console.log("Error: " + JSON.stringify(error))
      })

  } );
})


async function saveRegistration(data) {
  const header =  {
    // "Authorization": "Basic " + credential,
     "Content-Type": "application/json",
     'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': "GET,POST,OPTIONS,DELETE,PUT",
  }
  const response = await fetch("/api/user/save", {
  method: "POST",
  headers: header,
  
  body: JSON.stringify(data),
  
  })
    return await response.json();

}