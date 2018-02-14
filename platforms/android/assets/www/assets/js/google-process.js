document.addEventListener("deviceready", function() {
}, false);

google = {
	endLoginCheck:function(status){
		if (status === -1){
			console.log('not signed in');
		}
		else{
			google.me(status);
		}
	},
	endLogin:function(result){
		if (result === -1) {
			// Login was not successful :(
			alert('Login error');
		} else {
			// If successful login, use access_token to get profile name
			google.me(result);
		}
	},
	logout:function(e){
		gl.logOut();
		document.getElementById("profile-name").innerHTML = ' ... ';
		var logoutButton = document.getElementById("logout-button");
		logoutButton.style.display = 'none';
		var loginButton = document.getElementById("login-button");
		loginButton.style.display = 'inline';
	},
	me:function(accessToken){
		if (accessToken !== null && typeof(accessToken) !== 'undefined') {
			var urlAPI = "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + accessToken;
			var xmlreq = new XMLHttpRequest();
			xmlreq.onreadystatechange = function() {
				if (xmlreq.readyState == 4 && xmlreq.status == 200) {
					var response = eval('(' + xmlreq.responseText + ')');
					if (response.name) {
						document.getElementById("profile-name").innerHTML = response.name + '<br>Id: ' + response.id;
						var loginButton = document.getElementById("login-button");
						loginButton.style.display = 'none';
						var logoutButton = document.getElementById("logout-button");
						logoutButton.style.display = 'inline';
					}
				}
			};
			xmlreq.open("GET", urlAPI, true);
			xmlreq.send();
		}
	}
}