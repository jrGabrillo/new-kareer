var routes = [
    {
        path: '/home/',
        url: './pages/home.html',
        on: {
            pageInit: function(e,page){
                localStorage.clear();
                setTimeout(function(){
                    let callback = localStorage.getItem('callback'), account = localStorage.getItem('account');
                    if(account != null){
                        account = JSON.parse(account);
                        auth.auto(account['email'],account['id'],callback);
                    }
                },500);
            }
        }
    },
    {
        path: '/signin/',
        url: './pages/signin.html',
        on: {
            pageInit: function(e,page){
                signin.form();
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
                    },500);
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
                        },500);
                    },500);
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
                    new PerfectScrollbar('#tab_account .other-info');
                },500);
            }
        }
    },
    {
        path: '/account-info/',
        url: './pages/account-info.html',
        on: {
            pageInit: function(e, page){
                let data = account.get()[0];
                let auth = ((new RegExp('fb|google','i')).test(data[4]))? "hidden" : "";
                $("#display_accountLogin").addClass(auth);
            }
        }
    },
    {
        path: '/career-info/',
        url: './pages/settings_career_info.html',
        on: {
            pageInit: function(e, page){
                let ps_list_schools = new PerfectScrollbar('#list_jobs .content');
                let ps_newAcad = new PerfectScrollbar('.popup-newCareer');
                let ps_acad = new PerfectScrollbar('.popup-career');
                career.ini();
            }
        }
    },
    {
        path: '/academic-info/',
        url: './pages/settings_academic_info.html',
        on: {
            pageInit: function(e, page){
                let ps_list_career = new PerfectScrollbar('#list_schools .content');
                let ps_newCareer = new PerfectScrollbar('.popup-newAcad');
                let ps_career = new PerfectScrollbar('.popup-acad');
                academic.ini();
            }
        }
    },
    {
        path: '/personal-info/',
        url: './pages/settings_personal_info.html',
        on: {
            pageInit: function(e, page){
                new PerfectScrollbar('#display_personal_info');
                account.settingsDisplay();
            }
        }
    },
    {
        path: '/settings_account/',
        url: './pages/settings_account.html',
        on: {
            pageInit: function(e, page){
                account.settingsDisplay();
            }
        }
    },
    {
        path: '/settings_skills/',
        url: './pages/settings_skills.html',
        on: {
            pageInit: function(e, page){
                skills.display();
            }
        }
    },
    {
        path: '/bookmarks/',
        url: './pages/bookmarks.html',
        on: {
            pageInit: function(e, page){
                bookmark.ini();
                let ps = new PerfectScrollbar('#list_bookmarks');
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
                notifications.ini();
                let ps = new PerfectScrollbar('#list_notifications');
            }
        }
    },
    {
        path: '/notification/',
        url: './pages/notification-info.html',
        on: {
            pageInit: function(e, page){
                notification.ini();
                let ps = new PerfectScrollbar('#list_notifications');
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
                messages.ini();
                let ps = new PerfectScrollbar('.list.media-list');
                console.log('messages');
            }
        }
    },
    {
        path: '/message/',
        url: './pages/message.html',
        on: {
            pageInit: function(e, page){
                console.log('convo');
                let ps = new PerfectScrollbar('.messages-content');
            }
        }
    },
    {
        path: '/business/',
        url: './pages/business.html',
        on: {
            pageInit: function(e, page){
                business.ini();
                let ps_business = new PerfectScrollbar('#display_business');
            }
        }
    },
    {
        path: '/job/',
        url: './pages/job.html',
        on: {
            pageInit: function(e, page){
                job.ini();
                let ps_business = new PerfectScrollbar('#display_job');
            }
        }
    },
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];