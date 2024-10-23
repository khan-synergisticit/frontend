
async function logout(){
  var url = "http://192.168.1.76:8090/logout";
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_email");
	localStorage.removeItem("user_id");
	localStorage.removeItem("user_role");
  await fetch(url, {
  method: "GET",
  credentials: "include",
  mode: "no-cors",
  headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
  }
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
  const response = await fetch(url, {
  method: "GET",
  credentials: "include",
  headers: {
     'Authorization': "Bearer " + token,
     'Content-Type': 'application/x-www-form-urlencoded'
  }
  })
    return await response.json();
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
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}
function init(){
  const token = getCookie('access_token');
	if(token != null){
		console.log('token:', token);
		localStorage.setItem("access_token", token);
			fetchUser()
			.then(res =>{
					console.log("res: " + JSON.stringify(res));
					localStorage.setItem("user_email", res.email);
					localStorage.setItem("user_id", res.id);
					localStorage.setItem("user_role", res.role);
			}).catch(error =>{
				console.log("error: " + error)
			})
	}
}