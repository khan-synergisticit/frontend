
async function logout(){
  
  const sessionId =     sessionStorage.getItem("sessionId")
  let userData = sessionStorage.getItem("user_data");
  userData = JSON.parse(userData)
  let user_data = {"userData" : userData}
  const session = {"sessionId": sessionId}
  console.log("sessionId: " + sessionId)
  var url = "/api/user/logout"; //?sessionId=" + sessionId;

    await fetch(url, {
      method: "GET",
      headers:{
        "Content-Type": "text/html; charset=utf-8"
      }
        }).then((data)=>{
          console.log("logout: " + JSON.stringify(data));
          sessionStorage.removeItem("user_email");
          sessionStorage.removeItem("user_id");
          sessionStorage.removeItem("user_role");
          window.location.replace("http://192.168.61.11:8080");
    }).catch((error)=>{
      console.log("Logout error: " + error)
    }).finally((_) =>{
      sessionStorage.removeItem("user_email");
          sessionStorage.removeItem("user_id");
          sessionStorage.removeItem("user_role");
    })
  
}

var loginFunc =()=>{
  var oauth2Endpoint = "/login"; 
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); 
  form.setAttribute('action', oauth2Endpoint);
  document.body.appendChild(form);
  form.submit();
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  console.log(cookies)
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}
function init(){
  $(function(){
    $.ajax({
      url: "api/user/data",
      method: "GET",
      success: function(data, status, xht){
        console.log("data:  " + JSON.stringify(data))
        sessionStorage.setItem("user_email", data.email);
      sessionStorage.setItem("user_id", data.id);
      sessionStorage.setItem("user_role", data.role);
      sessionStorage.setItem("sessionId", data.sessionId)
      sessionStorage.setItem("user_data", JSON.stringify(data))
      window.location.replace("http://192.168.61.11:8080");
    }
    })
  })
  // fetch("api/user/data",

  //   {
  //     method: "GET",

  //   }
  // )
  //   .then(response => 
  //   {
  //     console.log("response: " + JSON.stringify(response))
  //   }
  //   )
  //   .catch(error => {
  //     console.log("init error1: " + error)
  //   })
  //   .then(data => {
  //     console.log("Data1: " + JSON.stringify(data))
  //     console.log("data.role: " + data.role)
  //     sessionStorage.setItem("user_email", data.email);
  //     sessionStorage.setItem("user_id", data.id);
  //     sessionStorage.setItem("user_role", data.role);
  //     sessionStorage.setItem("sessionId", data.sessionId)
  //     sessionStorage.setItem("user_data", JSON.stringify(data))
  //    // window.location.replace("http://192.168.1.69:8080")
  //   }).catch(error => {
  //     console.log("init error2: " + error)
  //   });
	
}

