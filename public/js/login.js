const AUTH_CLIENT_URL="http://192.168.1.76:8090"

async function login() {
  var url = AUTH_CLIENT_URL + "/login";
  console.log("token: " + token)
  const response = await fetch(url, {
  method: "GET",
  headers: {
     "Content-Type": "multipart/form-data",
  },
  })
    return await response.json();
}

var loginFunc =()=>{
  var oauth2Endpoint = AUTH_CLIENT_URL +"/login"; // "http://127.0.0.1:8090/login";
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);
  document.body.appendChild(form);
  form.submit();
}

async function fetchUser() {
  var url = AUTH_CLIENT_URL +"/api/user/find";
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
  var url = AUTH_CLIENT_URL + "/getAccessToken?code="+auth_code;
  const response = await fetch(url, {
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/x-www-form-urlencoded"
    },
    
    })
    return await response.json();
    
}