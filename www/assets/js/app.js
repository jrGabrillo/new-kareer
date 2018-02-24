var $$ = Dom7;
var app = new Framework7({
    id: 'rnr.kareer.app',
    root: '#app',
    theme: 'md',
    routes: routes,
});
var view = app.views.create('.view-main');

// view.router.navigate('/signup-auth/');
view.router.navigate('/home/');
// view.router.navigate('/account/');
// setTimeout(function () {
//   app.preloader.hide();
// }, 3000);