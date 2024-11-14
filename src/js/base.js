$(function(){
  const role = sessionStorage.getItem("user_role");
		console.log("role: " + role);
		

		if(role === null){
			$("#login_button").remove()
			$('#logout_button').remove()
			$("#login-link").append('<button onclick="loginFunc()" id=login_button type="button"  class="btn btn-link" style="color: #ffffff;"><i class="fa-solid fa-right-to-bracket" style="color: #ffffff;"></i> LOGIN</button>')
		}else  {
			$("#login_button").remove()
			$('#logout_button').remove()
			$("#login-link").append('<button onclick="logout()" id=logout_button  type="button"  class="btn btn-link" style="color: #ffffff;"><i	class="fa-solid fa-right-to-bracket" style="color: #ffffff;"></i> LOGOUT</button>')
		
			if(role === "ROLE_ADMIN"){
			$("#role-link").append('<a class="nav-link active" aria-current="page" href="/admin/index.html"><iclass="fa-solid fa-house"></i> Home</a>')
		} else {
			$("#role-link").append('<a class="nav-link active" aria-current="page" href="/index.html"><iclass="fa-solid fa-house"></i> Home</a>')
		}
		}
})