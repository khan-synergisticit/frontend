
async function logout(){
  var url = "/api/logout";
  const sessionId =     sessionStorage.getItem("sessionId")

  await fetch(url, {
  method: "POST",
  body: {sessionId}
  }).then((data)=>{
    console.log("logout: " + JSON.stringify(data));
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_role");
    window.location.replace("http://192.168.1.69:8080");
  })
}


async function login() {
  var url = "http://192.168.1.76:8090/login";
  $.ajax({
    url: url,
    contentType: 'multipart/form-data',
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': 'http://192.168.1.98'
   },
  })
}
var loginFunc =()=>{
  var oauth2Endpoint = "http://192.168.1.76:8090/login"; // "http://127.0.0.1:8090/login";
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); 
  form.setAttribute('action', oauth2Endpoint);
  document.body.appendChild(form);
  form.submit();
  init();
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
  try{
    
    fetch('/data')
    .then(response => response.json())
    .catch(error => {
      console.log("init error1: " + error)
    })
    .then(data => {
      console.log("Data1: " + JSON.stringify(data))
      console.log("data.role: " + data.role)
      sessionStorage.setItem("user_email", data.email);
      sessionStorage.setItem("user_id", data.id);
      sessionStorage.setItem("user_role", data.role);
      sessionStorage.setItem("sessionId", data.sessionId)
      window.location.replace("http://192.168.1.69:8080")
    }).catch(error => {
      console.log("init error2: " + error)
    });
  
  } catch (error) {
    console.log("init error3: " + error);
  }
	
}

