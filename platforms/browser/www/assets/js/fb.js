openFB.init({appId: '407673386340765'});

fb = {
    ini:function(){
        // getLoginStatus();
    },
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

