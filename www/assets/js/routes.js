var routes = [
    {
        path: '/home/',
        url: './pages/home.html',
    },
    {
        path: '/signin/',
        url: './pages/signin.html',
        on: {
            pageInit: function(e,page){
                signin.ini();
                auth.facebook();
                auth.google();
                $("#signin_facebook").on('click', function() {
                    fb.login();
                });
            }
        }
    },
    {
        path: '/signup/',
        url: './pages/signup.html',
        on: {
            pageInit: function(e,page){
                console.log('sss');
                signup.form();

                // signin.ini();
                auth.facebook();
                auth.google();
                $("#signin_facebook").on('click', function() {
                    fb.login();
                });
            }
        }
    },
    {
        path: '/signin-auth/',
        url: './pages/signinAuth.html',
        on: {
            pageInit: function(e,page){
                console.log('hello world. Sign in');
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
                        let profile = JSON.parse(localStorage.getItem('account'));
                        $("#display_form img").attr({'src':profile.picture});

                        $("#display_form input[name='field_firstname']").val(profile.first_name);
                        $("#display_form input[name='field_lastname']").val(profile.last_name);
                        $("#display_form input[name='field_firstname']").parents('.item-content').addClass('item-input-focused');

                        if(profile.email != ""){
                            $("#display_form input[name='field_email']").val(profile.email);
                            $("#display_form input[name='field_email']").parents('.item-content').addClass('item-input-focused');
                        }

                        $("#display_form .loader").attr({style:'display:none;'});
                        $("#display_form form").attr({style:'display:block;'});

                        // let _form = $(form).serializeArray();
                        // let auth = localStorage.getItem('callback');
                        // let profile = JSON.parse(localStorage.getItem('account'));
                        // form = [form[0].value, form[1].value, form[2].value, form[3].value, auth, profile.id, profile.picture];
                        // let data = system.ajax(system.host('do-signUp'),form);
                        // data.done(function(data){
                        //     console.log(data);
                        //     if(data == 1){
                        //         system.notification("Kareer","Success. You are now officially registered.");
                        //         view.router.navigate('/home/');                        
                        //     }
                        //     else if(data == 2){
                        //         system.notification("Kareer","You are already signed in. Try signing in using your email.");
                        //     }
                        //     else{
                        //         system.notification("Kareer","Sign up failed.",false,3000,true,false,false);
                        //     }
                        // });
                    },2000);

                }
            }
        }
    },
    {
        path: '/account/',
        url: './pages/account.html',
        on: {
            pageInit: function(e, page){
                // account.ini();
                jobs.display();
                var mySwiper = new Swiper('#tab_jobs .swiper-container', {
                    speed: 800,
                    spaceBetween: 10,
                });
                let ps = new PerfectScrollbar("#about p");
                $('#display_jobs .card-content')
                    .each(function() {
                        ps = new PerfectScrollbar(this);
                    })
                app.tab.show('#tab_jobs', true);
                // var view = app.views.create('#tab_jobs');
                // view.router.navigate('/signup/');
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