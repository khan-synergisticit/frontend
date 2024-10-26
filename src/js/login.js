
async function logout(){
  var url = "http://192.168.1.76:8090/logout";
  const token = localStorage.getItem("access_token");
  
  await fetch(url, {
  method: "GET",
  credentials: "include",
  mode: "no-cors",
  headers: {
    "Authorization": "Bearer " + token,
     'Content-Type': 'application/x-www-form-urlencoded'
  }
  }).then((data)=>{
    console.log("logout: " + JSON.stringify(data));
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");
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
}
async function fetchUser() {
  var url = "http://192.168.1.76:8090/api/user/find";
  const token = localStorage.getItem("access_token");
  console.log("token: " + token)
  console.log("fetching user...")
  if(token !== null){
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        return await response.json();
  }
}
async function fetchAccessToken(auth_code) {
  var url = "http://192.168.1.76:8090/getAccessToken?code="+auth_code;
  const response = await fetch(url, {
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/x-www-form-urlencoded"
    },    
    })
    return await response.json();    
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
  // const urlParams = new URLSearchParams(window.location.search);
	// 	const code = urlParams.get('code');
  console.log("cookies: " + document.cookie)

  fetch('/api/user')
  .then(response => response.json())
  .then(data => {
    const code = data.code;
    console.log("DATA: " + code); // 'Hello from Express!'
    if(code != null){
		
      localStorage.setItem("access_token", code);
        fetchUser()
        .then(res =>{
            console.log("res: " + JSON.stringify(res));
            localStorage.setItem("user_email", res.email);
            localStorage.setItem("user_id", res.id);
            localStorage.setItem("user_role", res.role);
            //window.location.replace("http://192.168.1.69:8080");
        }).catch(error =>{
          console.log("error: " + error)
        })
    }
  });
    //alert(getCookie("access_token"))
	
}

