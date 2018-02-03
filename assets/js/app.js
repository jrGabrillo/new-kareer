var $$ = Dom7;
var app = new Framework7({
    id: 'rnr.kareer.app',
    root: '#app',
    theme: 'md',
    routes: routes,
});
var view = app.views.create('.view-main');

// view.router.navigate('/account-info/');
view.router.navigate('/account/');
// view.router.navigate('/home/');
// setTimeout(function () {
//   app.preloader.hide();
// }, 3000);
