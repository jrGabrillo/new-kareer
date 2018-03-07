var routes = [
    {
        path: '/home/',
        url: './pages/home.html',
        on: {
            pageInit: function(e,page){
                setTimeout(function(){
                    let callback = localStorage.getItem('callback'), account = localStorage.getItem('account');
                    if(account == null)
                        view.router.navigate('/signin/');  
                    else
                        account = JSON.parse(account);

                    auth.auto(account['email'],account['id'],callback);
                },1000);
            }
        }
    },
    {
        path: '/signin/',
        url: './pages/signin.html',
        on: {
            pageInit: function(e,page){
                signin.form();
                auth.google(function(){
                    auth.googleSignIn(
                        document.getElementById('signin_gmail'),
                        function(){
                            system.notification('Google','You are now signed in');
                            view.router.navigate('/account/');     
                        }
                    );
                });
                $("#signin_facebook").on('click', function() {
                    fb.login(function(){
                        system.notification('Facebook','You are now signed in');
                        view.router.navigate('/account/');     
                    });
                });
            }
        }
    },
    {
        path: '/signup/',
        url: './pages/signup.html',
        on: {
            pageInit: function(e,page){
                signup.form();
                auth.google(function(){
                    auth.googleSignIn(
                        document.getElementById('signin_gmail'),
                        function(){
                            system.notification('Google','You are now signed in');
                            view.router.navigate('/signup-auth/');
                        }
                    );
                });
                $("#signin_facebook").on('click', function() {
                    fb.login(function(){
                        system.notification('Facebook','You are now signed in');
                        view.router.navigate('/signup-auth/');
                    });
                });
            }
        }
    },
    {
        path: '/signup-auth/',
        url: './pages/signupAuth.html',
        on: {
            pageInit: function(e,page){
                let isSigned = (localStorage.getItem('account') != null)?localStorage.getItem('account'):false;
                if(!isSigned){
                    setTimeout(function(){
                        view.router.navigate('/home/');
                    },1000);
                }
                else{
                    setTimeout(function(){
                        let profile = JSON.parse(localStorage.getItem('account')),auth = localStorage.getItem('callback');
                        if(auth == 'google-oauth')
                            $("#form_signupAuth img#display_logo").attr({'src':'assets/img/icons/google.png'});
                        else
                            $("#form_signupAuth img#display_logo").attr({'src':'assets/img/icons/facebook.png'});

                        $("#form_signupAuth img#display_picture").attr({'src':profile.picture});
                        $("#form_signupAuth input[name='field_firstname']").val(profile.first_name);
                        $("#form_signupAuth input[name='field_lastname']").val(profile.last_name);
                        $("#form_signupAuth input[name='field_firstname']").parents('.item-content').addClass('item-input-focused');

                        if(profile.email != ""){
                            $("#form_signupAuth input[name='field_email']").val(profile.email);
                            $("#form_signupAuth input[name='field_email']").parents('.item-content').addClass('item-input-focused');
                        }

                        $("#form_signupAuth form").attr({style:'display:block;'});
                        setTimeout(function(){
                            form = [profile.first_name, profile.last_name, profile.email, "", auth, profile.id, profile.picture];
                            let data = system.ajax(system.host('do-signUp'),form);
                            data.done(function(data){
                                if(data == 1){
                                    system.notification("Kareer","Success. You are now officially registered.");
                                    view.router.navigate('/signin/');                        
                                }
                                else if(data == 2){
                                    view.router.navigate('/signin/');                        
                                    system.notification("Kareer","You are already signed in. Try signing in using your email.");
                                }
                                else{
                                    system.notification("Kareer","Sign up failed.",false,3000,true,false,false);
                                }
                            });
                        },2000);
                    },1000);
                }
            }
        }
    },
    {
        path: '/account/',
        url: './pages/account.html',
        on: {
            pageInit: function(e, page){
                setTimeout(function(){
                    account.ini();
                });
            }
        }
    },
    {
        path: '/account-info/',
        url: './pages/account-info.html',
        on: {
            pageInit: function(e, page){
                console.log('info');
            }
        }
    },
    {
        path: '/career-info/',
        url: './pages/career-info.html',
        on: {
            pageInit: function(e, page){
                console.log('career');
            }
        }
    },
    {
        path: '/academic-info/',
        url: './pages/academic-info.html',
        on: {
            pageInit: function(e, page){
                console.log('academic');
            }
        }
    },
    {
        path: '/bookmarks/',
        url: './pages/bookmarks.html',
        on: {
            pageInit: function(e, page){
                console.log('bookmark');
            }
        }
    },
    {
        path: '/settings/',
        url: './pages/settings.html',
        on: {
            pageInit: function(e, page){
                console.log('info');
            }
        }
    },
    {
        path: '/notifications/',
        url: './pages/notifications.html',
        on: {
            pageInit: function(e, page){
                let ps = new PerfectScrollbar('#list_jobs');
            }
        }
    },
    {
        path: '/resume/',
        url: './pages/resume.html',
        on: {
            pageInit: function(e, page){
                console.log('resume');
            }
        }
    },
    {
        path: '/resume-builder/',
        url: './pages/resume-builder.html',
        on: {
            pageInit: function(e, page){
                console.log('resume');
            }
        }
    },
    {
        path: '/messages/',
        url: './pages/messages.html',
        on: {
            pageInit: function(e, page){
                console.log('messages');
            }
        }
    },
    {
        path: '/message/',
        url: './pages/message.html',
        on: {
            pageInit: function(e, page){
                let ps = new PerfectScrollbar('.messages-content');
            }
        }
    },
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];