/* Google Login module for Phonegap 
 * Author: E. Valencia
 * Release date: 2014-03-18
 * Released under MIT license
 * https://github.com/valenzia10/PhonegapGoogleLogin
 */

var GoogleLogin = function(id,secret){
	var clientId = id;
	var clientSecret = secret;
	var accessToken =  {};
	var authWindow = null;
	var endSignin = {};

	var openAuthWindow = function(){
		var urlAuth = `https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&redirect_uri=http://localhost/kareers/www/callback.html&response_type=code&client_id=${clientId}`;
		authWindow = window.open(urlAuth, '_blank', 'location=yes,toolbar=no');
		authWindow.addEventListener('loadstart', parseRedirectUrl);
	};
	
	var parseRedirectUrl = function(e){
		var url = e;
		var thereIsCode = url.indexOf("code=");
		var thereIsError = url.indexOf("error=");

		console.log(thereIsCode);
		if(thereIsCode != -1){
			// window.close();
			var toMatch = "code=([^&#]*)";
			var regex = new RegExp(toMatch);
			var result = regex.exec(url);
			if(result != null){
				var code = result[1];
				exchangeCodeForTokens(code);
			}
		}
		else if(thereIsError != -1){
			window.close();
			localStorage["accessToken"] = null;
			endSignin(-1);
		}		
	};
	
	var exchangeCodeForTokens = function(code){
		var dataQuery = `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=http://localhost&grant_type=authorization_code`;
	
		requestTokens("https://accounts.google.com/o/oauth2/token",dataQuery,callBackTokens);
	};

	var callBackTokens = function(resp){
		var tokensResp = eval('('+resp+')');
	
		console.log(rep);
		if(tokensResp.access_token){
			localStorage.setItem("accessToken", tokensResp.access_token);
			localStorage.setItem("refreshToken", tokensResp.refresh_token);
			localStorage.setItem("refreshTime", (new Date()).getTime() + 1000*tokensResp.expires_in);
		
			accessToken = tokensResp.access_token;
			endSignin(accessToken);
		}else{
			accessToken = null;
			localStorage.setItem("accessToken", null);
			endSignin(-1);
		}
	};

	var getAccessToken = function(refreshToken){
		var dataQuery = `client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
	
		requestTokens("https://accounts.google.com/o/oauth2/token",dataQuery,callBackRefreshToken);
	};

	var callBackRefreshToken = function(resp){
		var tokensResp = eval('('+resp+')');

		if(tokensResp.access_token){
			localStorage["accessToken"] = tokensResp.access_token;
			localStorage["refreshTime"] = (new Date()).getTime() + 1000*tokensResp.expires_in;
	
			accessToken = tokensResp.access_token;	
			endSignin(accessToken);
		}else{
			accessToken = null;
			localStorage["accessToken"] = null;
			endSignin(-1);
		}
	};

	var requestTokens = function(url,data,callback){
		var xmlreq = new XMLHttpRequest();
		
		xmlreq.onreadystatechange=function(){
			if (xmlreq.readyState == 4){		
				callback(xmlreq.responseText);
			}
		};
		xmlreq.open("POST",url,true);
		xmlreq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlreq.send(data);
	};
	
	var isLoggedIn = function(callback){
		endSignin = callback;
		accessToken = localStorage["accessToken"];
		
		if(accessToken == "null"){
			accessToken = null;
		}
		
		if(accessToken!==null && typeof(accessToken)!=='undefined'){
			var refreshTime = localStorage["refreshTime"];
			var refreshToken = localStorage["refreshToken"];
			var currentTime = (new Date()).getTime();
			
			if(currentTime < refreshTime){
				endSignin(accessToken);
			}else{
				getAccessToken(refreshToken);
			}
		}
		else{
			endSignin(-1);
		}
	};
	
	var startSignin = function(callbackEnd){
        localStorage.setItem('callback','google-oauth');
		endSignin = callbackEnd;
		openAuthWindow();
	};
	
	var logOut = function(){
		accessToken = null;
		localStorage["accessToken"] = null;
		localStorage["refreshToken"] = null;
	};
	
	return {
				openAuthWindow: openAuthWindow,
				parseRedirectUrl: parseRedirectUrl,
				exchangeCodeForTokens: exchangeCodeForTokens,
				callBackTokens: callBackTokens,
				getAccessToken: getAccessToken,
				callBackRefreshToken: callBackRefreshToken,
				requestTokens: requestTokens,
				startSignin: startSignin,
				isLoggedIn: isLoggedIn,
				logOut: logOut
	        };
}();