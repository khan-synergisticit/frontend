$(function(){
  const role = localStorage.getItem("user_role");
		console.log("role: " + role);
		

		if(role === null){
			$("#login-link").append('<button onclick="loginFunc()"  type="button"  class="btn btn-link" style="color: #ffffff;"><i class="fa-solid fa-right-to-bracket" style="color: #ffffff;"></i> LOGIN</button>')
		}else  {

			$("#login-link").append('<button onclick="logout()"  type="button"  class="btn btn-link" style="color: #ffffff;"><i	class="fa-solid fa-right-to-bracket" style="color: #ffffff;"></i> LOGOUT</button>')
		
			if(role === "ROLE_ADMIN"){
			$("#role-link").append('<a class="nav-link active" aria-current="page" href="/admin/index.html"><iclass="fa-solid fa-house"></i> Home</a>')
		} else {
			$("#role-link").append('<a class="nav-link active" aria-current="page" href="/index.html"><iclass="fa-solid fa-house"></i> Home</a>')
		}
		}
})