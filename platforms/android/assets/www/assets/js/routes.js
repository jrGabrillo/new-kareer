var routes = [
    {
      path: '/home/',
      url: './pages/home.html',
    }, 
    {
      path: '/signin/',
      url: './pages/signin.html',
      on: {
        pageInit:function(e,page){
          account.ini();
        }
      }
    },
    {
      path: '/signup/',
      url: './pages/signup.html',
    },
    {
      path: '/account/',
      url: './pages/account.html',
      on: {
        pageInit:function(e,page){
          // account.ini();
          jobs.display();

          var mySwiper = new Swiper('#tab_jobs .swiper-container',{
            speed: 800,
            spaceBetween: 10,
          });

          let ps = new PerfectScrollbar("#about p");
          $('#display_jobs .card-content').each(function(){
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
        pageInit:function(e,page){
          console.log('info');
        }
      }
    },
    {
      path: '/career-info/',
      url: './pages/career-info.html',
      on: {
        pageInit:function(e,page){
          console.log('career');
        }
      }
    },
    {
      path: '/academic-info/',
      url: './pages/academic-info.html',
      on: {
        pageInit:function(e,page){
          console.log('academic');
        }
      }
    },
    {
      path: '/bookmarks/',
      url: './pages/bookmarks.html',
      on: {
        pageInit:function(e,page){
          console.log('bookmark');
        }
      }
    },
    {
      path: '/settings/',
      url: './pages/settings.html',
      on: {
        pageInit:function(e,page){
          console.log('info');
        }
      }
    },
    {
      path: '/notifications/',
      url: './pages/notifications.html',
      on: {
        pageInit:function(e,page){
          let ps = new PerfectScrollbar('#list_jobs');
        }
      }
    },
    {
      path: '/resume/',
      url: './pages/resume.html',
      on: {
        pageInit:function(e,page){
          console.log('resume');
        }
      }
    },
    {
      path: '/resume-builder/',
      url: './pages/resume-builder.html',
      on: {
        pageInit:function(e,page){
          console.log('resume');
        }
      }
    },
    {
      path: '/messages/',
      url: './pages/messages.html',
      on: {
        pageInit:function(e,page){
          console.log('messages');
        }
      }
    },
    {
      path: '/message/',
      url: './pages/message.html',
      on: {
        pageInit:function(e,page){
          let ps = new PerfectScrollbar('.messages-content');
        }
      }
    },
    {
      path: '(.*)',
      url: './pages/404.html',
    },
];