var system = function() {
	"use strict";
	return {
		ini: function() {
			$("body").append("<script>console.log('%cDeveloped By: RNR Digital Consultancy (2017) http://rnrdigitalconsultancy.com ,,|,_', 'background:#f74356;color:#64c2ec;font-size:20px;')</script>");
			$(document).ready(function() {
				$('.tooltipped').tooltip({
					delay: 50
				});
			});
			setTimeout(function() {
				system.loading(true);
				$('#content-login').addClass('animated slideInUp');
			}, 1000);
			login.ini();
		},
		ajax: function(url, data) {
			return $.ajax({
				type: "POST",
				url: url,
				data: {
					data: data
				},
				async: !1,
				cache: false,
				error: function() {
					console.log("Error occured")
				}
			});
		},
		html: function(url) {
			return $.ajax({
				type: "POST",
				url: url,
				dataType: 'html',
				data: {
					data: "kareer"
				},
				async: !1,
				cache: false,
				error: function() {
					console.log("Error occured")
				}
			});
		},
		xml: function(url) {
			return $.ajax({
				type: "POST",
				url: url,
				dataType: 'xml',
				async: !1,
				cache: false
			});
		},
		send_mail: function(email, subject, message, callback) {
			return system.ajax('../assets/harmony/Process.php?send-mail', [email, subject, message]);
		},
		clearForm: function() {
			$("form").find('input:email, input:text, input:password, input:file, select, textarea').val('');
			$("form").find('error').html('');
			$("form").find('input:text, input:password, input:file, select, textarea').removeClass("valid");
			$("form").find('input:radio, input:checkbox').removeAttr('checked').removeAttr('selected');
		},
		searchJSON: function(obj, key, val) {
			var objects = [];
			for (var i in obj) {
				if (!obj.hasOwnProperty(i)) continue;
				if (typeof obj[i] == 'object') {
					objects = objects.concat(this.searchJSON(obj[i], key, val));
				} else if (i == key && obj[key] == val) {
					objects.push(obj);
				}
			}
			return objects;
		},
		sortResults: function(data, prop, asc) {
			data = data.sort(function(a, b) {
				if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
				else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
			});
			return data;
		},
		host:function(page){
			return `http://system.kareer-ph.com/assets/harmony/mobile.php?${page}`;
			// return `http://localhost/kareer/assets/harmony/mobile.php?${page}`;
		},
		notification:function(title,subtitle){
            let n = app.notification.create({
                title: title,
                subtitle: subtitle,
                closeButton: true,
                closeTimeout: 3000,
            });n.open();
		},
		loading:function(){
			$("#app").append(`<div class="load-block inactive">
					            <div class="inner">
					                <div class="loading"></div>
					                <img src='assets/img/bg/loading.png' width='100%'>
					            </div>
					        </div>`);
		}
	}
}();