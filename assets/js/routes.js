var routes = [
    {
      path: '/home/',
      url: './pages/home.html',
    }, 
    {
      path: '/signin/',
      url: './pages/signin.html',
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
          jobs.display();
          // var view = app.views.create('#tab_jobs');
          // view.router.navigate('/signup/');
        }
      }
    },
    {
      path: '(.*)',
      url: './pages/404.html',
    },
];