var $$ = Dom7;
var app = new Framework7({
    id: 'rnr.kareer.app',
    root: '#app',
    theme: 'md',
    routes: routes,
});
var view = app.views.create('.view-main');

setTimeout(function () {
	view.router.navigate('/home/');
	app.preloader.hide();
}, 1000);