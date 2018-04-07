var routes = [
    {
        path: '/home/',
        url: './pages/home.html',
        on: {
            pageInit: function(e,page){
                localStorage.setItem('load','true');
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
                            signup.auth(form);
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
                if(localStorage.getItem('load')){
                    system.loading();
                }
                setTimeout(function(){
                    account.ini();
                    jobs.ini();
                    new PerfectScrollbar('#tab_account .other-info');
                },500);
            }
        }
    },
    {
        path: '/account_info/',
        url: './pages/account_info.html',
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
                let ps = new PerfectScrollbar('#display_personal_info');
                account.settingsDisplay();
            }
        }
    },
    {
        path: '/upload_picture/',
        url: './pages/settings_upload_picture.html',
        on: {
            pageInit: function(e, page){
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
                new PerfectScrollbar('#list_bookmarks');
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
                 // let ps = new PerfectScrollbar('#list_notifications');
          }
        }
    },
    {
        path: '/notification/',
        url: './pages/notification-info.html',
        on: {
            pageInit: function(e, page){
                notification.ini();
                let ps = new PerfectScrollbar('#display_job');
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
                convo.ini();
                // console.log('convo');
                let ps = new PerfectScrollbar('.messages-content');
            }
        }
    },
    {
        path: '/business/',
        url: './pages/business.html',
        on: {
            pageInit: function(e, page){

        var image = $("#display_picture1 img")[0]; // document.getElementById('display_picture1');
        var cropper = new Cropper(image, {
            aspectRatio: 1 / 1,
            autoCropArea: 0.80,
            viewMode:2,
            ready: function(){
                // $("a[data-cmd='save']").removeClass('hidden');
                // $("a[data-cmd='rotate']").removeClass('hidden');
                // $("a[data-cmd='save']").click(function() {
                //     $(this).html("Uploading...").addClass('disabled');
                //     if (status) {
                //         var data = system.ajax(system.host('do-updateImage'),[user, 'picture', cropper.getCroppedCanvas().toDataURL('image/png')]);
                //         data.done(function(data) {
                //          console.log(data);
                //             if (data == 1) {
                //              app.popup.close('.popup-picture',true);
                //                 account.ini();
                //                 system.notification("Kareer",`Picture Uploaded.`);
                //             }
                //             else {
                //              system.notification("Kareer",`Failed to upload your picture. File too large.`);
                //             }
                //         });
                //         status = false;
                //     }
                // });
            }
        });
            }
        }
    },
    {
        path: '/job/',
        url: './pages/job.html',
        on: {
            pageInit: function(e, page){
            }
        }
    },
    {
        path: '/logout/',
        url: './pages/logout.html',
        on: {
            pageInit: function(e, page){
                this.logout();
            }
        }
    },
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];