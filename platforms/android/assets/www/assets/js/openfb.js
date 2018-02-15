/**
 * OpenFB is a micro-library that lets you integrate your JavaScript application with Facebook.
 * OpenFB works for both BROWSER-BASED apps and CORDOVA/PHONEGAP apps.
 * This library has no dependency: You don't need (and shouldn't use) the Facebook SDK with this library. Whe running in
 * Cordova, you also don't need the Facebook Cordova plugin. There is also no dependency on jQuery.
 * OpenFB allows you to login to Facebook and execute any Facebook Graph API request.
 * @author Christophe Coenraets @ccoenraets
 * @version 0.5
 */

var openFB = (function () {
    document.addEventListener("deviceready", function(){
        window.open = cordova.InAppBrowser.open;
        runningInCordova = true;
    }, false);

    let loginURL = 'https://www.facebook.com/dialog/oauth',
        logoutURL = 'https://www.facebook.com/logout.php',
        tokenStore = window.sessionStorage,
        fbAppId,
        context = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")),
        baseURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + context,
        oauthRedirectURL = baseURL + '/callback.html',
        cordovaOAuthRedirectURL = "https://www.facebook.com/connect/login_success.html",
        logoutRedirectURL = baseURL + '/callback.html',
        loginCallback,
        runningInCordova,
        loginProcessed;

    function init(params) {
        if (params.appId){
            fbAppId = params.appId;
        }
        else{
            throw 'appId parameter not set in init()';
        }

        if (params.tokenStore) {
            tokenStore = params.tokenStore;
        }

        if (params.accessToken) {
            tokenStore.fbAccessToken = params.accessToken;
        }

        loginURL = params.loginURL || loginURL;
        logoutURL = params.logoutURL || logoutURL;
        oauthRedirectURL = params.oauthRedirectURL || oauthRedirectURL;
        cordovaOAuthRedirectURL = params.cordovaOAuthRedirectURL || cordovaOAuthRedirectURL;
        logoutRedirectURL = params.logoutRedirectURL || logoutRedirectURL;
    }
    function getLoginStatus(callback) {
        var token = tokenStore.fbAccessToken,
            loginStatus = {};
        if (token) {
            loginStatus.status = 'connected';
            loginStatus.authResponse = {accessToken: token};
        } else {
            loginStatus.status = 'unknown';
        }
        if (callback) callback(loginStatus);
    }
    function login(callback, options) {
        let loginWindow,
            startTime,
            scope = '',
            redirectURL = runningInCordova ? cordovaOAuthRedirectURL : oauthRedirectURL;

        if (!fbAppId) {
            return callback({status: 'unknown', error: 'Facebook App Id not set.'});
        }

        function loginWindow_loadStartHandler(event) {
            var url = event.url;
            if (url.indexOf("access_token=") > 0 || url.indexOf("error=") > 0) {
                var timeout = 600 - (new Date().getTime() - startTime);
                setTimeout(function () {
                    loginWindow.close();
                }, timeout > 0 ? timeout : 0);
                oauthCallback(url);
            }
        }

        function loginWindow_exitHandler() {
            console.log('exit and remove listeners');
            if (loginCallback && !loginProcessed) loginCallback({status: 'user_cancelled'});
            loginWindow.removeEventListener('loadstop', loginWindow_loadStopHandler);
            loginWindow.removeEventListener('exit', loginWindow_exitHandler);
            loginWindow = null;
            console.log('done removing listeners');
        }

        if (options && options.scope) {
            scope = options.scope;
        }

        loginCallback = callback;
        loginProcessed = false;

        startTime = new Date().getTime();
        loginWindow = window.open(loginURL + '?client_id=' + fbAppId + '&redirect_uri=' + redirectURL +
            '&response_type=token&scope=' + scope, '_blank', 'location=no,clearcache=yes');

        if (runningInCordova) {
            loginWindow.addEventListener('loadstart', loginWindow_loadStartHandler);
            loginWindow.addEventListener('exit', loginWindow_exitHandler);
        }
    }
    function oauthCallback(url) {
        var queryString,
            obj;
        console.log(url.indexOf("access_token="));        

        loginProcessed = true;
        if (url.indexOf("access_token=") > 0) {
            console.log('xxx');
            queryString = url.substr(url.indexOf('#') + 1);
            obj = parseQueryString(queryString);
            tokenStore.fbAccessToken = obj['access_token'];
            if (loginCallback) loginCallback({status: 'connected', authResponse: {accessToken: obj['access_token']}});
        } else if (url.indexOf("error=") > 0) {
            console.log('xxx');
            queryString = url.substring(url.indexOf('?') + 1, url.indexOf('#'));
            obj = parseQueryString(queryString);
            if (loginCallback) loginCallback({status: 'not_authorized', error: obj.error});
        } else {
            console.log('xxx');
            if (loginCallback) loginCallback({status: 'not_authorized'});
        }
    }
    function logout(callback) {
        var logoutWindow,
            token = tokenStore.fbAccessToken;

        tokenStore.removeItem('fbtoken');
        if (token) {
            logoutWindow = window.open(logoutURL + '?access_token=' + token + '&next=' + logoutRedirectURL, '_blank', 'location=no,clearcache=yes');
            if (runningInCordova) {
                setTimeout(function() {
                    logoutWindow.close();
                }, 700);
            }
        }

        if (callback) {
            callback();
        }
    }
    function api(obj) {
        console.log(obj);
        var method = obj.method || 'GET',
            params = obj.params || {},
            xhr = new XMLHttpRequest(),
            url;
        console.log(params);
        params['access_token'] = tokenStore.fbAccessToken;

        url = 'https://graph.facebook.com' + obj.path + '?' + toQueryString(params);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (obj.success) obj.success(JSON.parse(xhr.responseText));
                } else {
                    var error = xhr.responseText ? JSON.parse(xhr.responseText).error : {message: 'An error has occurred'};
                    if (obj.error) obj.error(error);
                }
            }
        };

        xhr.open(method, url, true);
        xhr.send();
    }
    function revokePermissions(success, error) {
        return api({method: 'DELETE',
            path: '/me/permissions',
            success: function () {
                success();
            },
            error: error});
    }
    function parseQueryString(queryString) {
        var qs = decodeURIComponent(queryString),
            obj = {},
            params = qs.split('&');
        params.forEach(function (param) {
            var splitter = param.split('=');
            obj[splitter[0]] = splitter[1];
        });
        return obj;
    }
    function toQueryString(obj) {
        var parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
            }
        }
        return parts.join("&");
    }

    return {
        init: init,
        login: login,
        logout: logout,
        revokePermissions: revokePermissions,
        api: api,
        oauthCallback: oauthCallback,
        getLoginStatus: getLoginStatus
    }
}());

openFB.init({appId: '407673386340765'});
fb = {
    login:function(){
        localStorage.setItem('callback','oauth');
        openFB.login(
            function(response){
                console.log(response);
                if(response.status === 'connected') {
                    alert('Facebook login succeeded, got access token: ' + response.authResponse.accessToken);
                } else {
                    alert('Facebook login failed: ' + response.error);
                }
            }, {scope: 'email'});
    },
    getInfo:function(){
        openFB.api({
            path: '/me',
            success: function(data){
                console.log(JSON.stringify(data));
                document.getElementById("userName").innerHTML = data.name;
                document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
            },
            error: fb.errorHandler});
    },
    share:function(){
        openFB.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message: document.getElementById('Message').value || 'Testing Facebook APIs'
            },
            success: function() {
                alert('the item was posted on Facebook');
            },
            error: fb.errorHandler});
    },
    readPermissions:function(){
        openFB.api({
            method: 'GET',
            path: '/me/permissions',
            success: function(result){
                alert(JSON.stringify(result.data));
            },
            error: fb.errorHandler
        });
    },
    revoke:function(){
        openFB.revokePermissions(
            function() {
                alert('Permissions revoked');
            },
            fb.errorHandler);
    },
    logout:function(){
        localStorage.setItem('callback','logout');
        openFB.logout(
            function() {
                alert('Logout successful');
            },
            fb.errorHandler);
    },
    errorHandler:function(error){
        alert(error.message);
    }
}