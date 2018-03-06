account = {
	ini:function(){
		let data = JSON.parse(localStorage.getItem('account'));
		console.log(data);

        jobs.display();
        var mySwiper = new Swiper('#tab_jobs .swiper-container', {
            flipEffect: {
                rotate: 30,
                slideShadows: false,
            },
            speed: 800,
            spaceBetween: 10,                    
        });

		// let applicant = system.ajax(system.host('get-applicant'), data);
		// applicant.done(function(data){
		// 	applicant = JSON.parse(data);
		// 	console.log(applicant);
		// 	account.display(applicant);
		// });
	},
	display:function(applicant){
		let picture = applicant[0][19];
		$('#picture-holder').css('background','url('+picture+')');
		$('#fullname').html(applicant[0][8]+" "+applicant[0][9]);
		$('#about p').html(applicant[0][1]);

		$('#fullname').val(applicant[0][8]+" "+applicant[0][9]);
		$('#DateOfBirth').val(applicant[0][13]);
		$('#address').val(applicant[0][13]);
		$('#description').val(applicant[0][1]);

		$('#email').val(applicant[0][2]);
		$('#password').val(applicant[0][3]);			
	}
}

jobs = {
	ini:function(){
		console.log('jobs initialized')
	},
	get:function(){
		let data = [
					{
						company:{
							logo:'rnr_logo.png',
							name:'RNR Digital Consultancy',
							address:'Unit 8 Viliran Compound, P. Moran West, Lingayen, Pangasinan Unit 8 Viliran Compound, P. Moran West, Lingayen, Pangasinan'
						},
						job:{
							title:'Front-End Developer',
							date:'January 31, 2018',
							requirements:`
										<ul>
											<li>1. Skills of a Front-End Developer.</li>
											<li>2. Skills of a Front-End Developer.</li>
											<li>3. Skills of a Front-End Developer.</li>
											<li>4. Skills of a Front-End Developer.</li>
											<li>5. Skills of a Front-End Developer.</li>
											<li>6. Skills of a Front-End Developer.</li>
											<li>7. Skills of a Front-End Developer.</li>
											<li>8. Skills of a Front-End Developer.</li>
											<li>9. Skills of a Front-End Developer.</li>
											<li>10. Skills of a Front-End Developer.</li>
											<li>11. Skills of a Front-End Developer.</li>
											<li>12. Skills of a Front-End Developer.</li>
											<li>13. Skills of a Front-End Developer.</li>
											<li>14. Skills of a Front-End Developer.</li>
										</ul>
										`,
							description:`<p>We are in need of Front-End Developers, who are passionate and highly motivated in making great ideas into reality.</p>`,
						}
					},
					{
						company:{
							logo:'apple.png',
							name:'Apple Corp',
							address:'Bgy. Bagumbayan, Libis, Quezon City, Metro Manila, Philippines'
						},
						job:{
							title:'Operations Manager for Apple Farm',
							date:'February 1, 2018',
							requirements:`
										<ul>
											<li>Skills of an Operations Manager.</li>
											<li>Skills of an Operations Manager.</li>
											<li>Skills of an Operations Manager.</li>
											<li>Skills of an Operations Manager.</li>
											<li>Skills of an Operations Manager.</li>
											<li>Skills of an Operations Manager.</li>
										</ul>
										`,
							description:'<p>We are in need of Operations Managers, who are passionate and highly motivated in operating farm industry.</p><p>We are in need of Operations Managers, who are passionate and highly motivated in operating farm industry.</p>',
						}
					},
					{
						company:{
							logo:'penshoppe.png',
							name:'Penshoppe Inc.',
							address:'519-520 Makiling St, Makati, Metro Manila, Philippines'
						},
						job:{
							title:'Pen Maker',
							date:'January 15, 2018',
							requirements:`
										<ul>
											<li>Skills of a Pen Maker.</li>
											<li>Skills of a Pen Maker.</li>
											<li>Skills of a Pen Maker.</li>
										</ul>
										`,
							description:'<p>We are in need of Pen Makers, who are passionate and highly motivated in making pen products.</p>',
						}
					},
					{
						company:{
							logo:'bench.png',
							name:'Bench Furnitures',
							address:'Dona Irenia, Parañaque, Metro Manila, Philippines'
						},
						job:{
							title:'Wood Carver',
							date:'January 12, 2018',
							requirements:`
										<ul>
											<li>Skills of a wood carver.</li>
											<li>Skills of a wood carver.</li>
											<li>Skills of a wood carver.</li>
										</ul>
										`,
							description:'<p>We are in need of Wood Carvers, who are passionate and highly motivated in carving bench furnitures.</p>',
						}
					},
					{
						company:{
							logo:'huawei.png',
							name:'Huawei Inc.',
							address:'Taft Ave. Malate Manila, Manila, Metro Manila, Philippines'
						},
						job:{
							title:'Chief Technlogy Officer',
							date:'January 1, 2018',
							requirements:`
										<ul>
											<li>Skills of a Chief Technlogy Officer</li>
											<li>Skills of a Chief Technlogy Officer</li>
											<li>Skills of a Chief Technlogy Officer</li>
										</ul>
										`,
							description:'<p>We are in need of a Chief Technlogy Officer, who are passionate and highly motivated in leading.</p>',
						}
					},
					];
		return data;
	},
	display:function(){
		let display = "";
		for(let post of this.get()){
			$('#display_jobs').append(`<div class='swiper-slide'>
										<div class='card job'>
											<div class='card-header align-items-flex-end'>
												<div class='company'>
													<div class='logo-holder'><div class='logo' style='background:url(assets/img/logo/${post.company.logo}) center/cover no-repeat;'></div></div>
													<div class='information'>
														<h3>${post.company.name}</h3>
														<div>${post.company.address}</div>
													</div>
												</div>
											</div>
											<div class='card-content card-content-padding align-self-stretch'>
												<div class='job-description'>
													<h3>${post.job.title}</h3>
													<p><span>${post.job.date}</span></p>
													<div class='row'>
														<strong>Skills</strong>
														<div id='display_skills'>
															<div class="chip color-pink">
																<div class="chip-label">Lorem </div>
															</div>
															<div class="chip color-green">
																<div class="chip-label">voluptatem </div>
															</div>
															<div class="chip color-yellow">
																<div class="chip-label">numquam </div>
															</div>
															<div class="chip color-blue">
																<div class="chip-label">reprehenderit </div>
															</div>
														</div>
													</div>
													<div class='row'>
														<strong>Description</strong>
														${post.job.description}
													</div>
												</div>
											</div>
				                            <div class="card-footer">
												<button class="button col button-round">Read more</button>
				                            </div>
										</div>
									</div>`);
		}
		// this.scroll();
	},
	scroll:function(){
		let scroll = 0, direction = "";
		$("#display_jobs .card-content").on( 'scroll', function(){
			let scrolled = $(this).scrollTop();
			direction = (scrolled>scroll)?'up':'down';
			console.log(`${direction} ${scrolled}`);
			if((direction == 'up') && (scrolled > 10)){
				$(this).parent('.card').addClass('active');
				$(this).scrollTop(110);
				// $(this).parent('.job').find('.logo-holder').attr({'style':`transform:scale(${(1*0.6)}); top:-${(scrolled*0.6)}px; left:-${(scrolled*0.7)}px;`});
			}
			else if((direction == 'down') && (scrolled < 100)){
				$(this).parent('.card').removeClass('active');
				$(this).scrollTop(0);
				// $(this).animate({scrollTop:0},200);
			}
			scroll = scrolled;
		});
	}
}

search = {
	ini:function(){
		
	}
}

signin = {
	form:function(){
		let c = 0;
		$(".item-input-password-preview").on('click',function(){
			c++;
			if((c%2)==0){
				$(this).children('i').html('visibility_off');
				$("#form_signin input[name='field_password']").attr({'type':'password'});
			}
			else{
				$(this).children('i').html('visibility');
				$("#form_signin input[name='field_password']").attr({'type':'text'});
			}
		});

		$("#form_signin").validate({
			rules: {
				field_email: {required: true, maxlength: 50, email:true},
				field_password: {required: true, maxlength: 50},
			},
			errorElement : 'div',
			errorPlacement: function(error, element) {
				var placement = $(element).data('error');
				if(placement){
					$(placement).append(error)
				} 
				else{
					error.insertAfter(element);
				}
			},
			submitHandler: function (form) {
				var _form = $(form).serializeArray();
                var data = system.ajax(system.host('do-logIn'),[form[0].value,form[1].value]);
                data.done(function(data){
                    data = JSON.parse(data);
                    if(data[1] == 'applicant'){
                        system.notification("Kareer","Signed in.");
                        account.ini(form[0].value);
                        view.router.navigate('/account/');                        
                    }
                    else{
                        system.notification("Kareer","Sign in failed.");
                    }
                });
		    }
		});
	}
}

signup = {
	form:function(){
		let c = 0;
		$(".item-input-password-preview").on('click',function(){
			c++;
			if((c%2)==0){
				$(this).children('i').html('visibility_off');
				$("#display_form input[name='field_password']").attr({'type':'password'});
			}
			else{
				$(this).children('i').html('visibility');
				$("#display_form input[name='field_password']").attr({'type':'text'});
			}
		});

		$("#form_signup").validate({
			rules: {
				field_firstname: {required: true, maxlength: 50},
				field_lastname: {required: true, maxlength: 50},
				field_email: {required: true, maxlength: 100, email:true, validateEmail:true},
				field_password: {required: true, maxlength: 50},
			},
			errorElement : 'div',
			errorPlacement: function(error, element) {
				var placement = $(element).data('error');
				if(placement){
					$(placement).append(error)
				} 
				else{
					error.insertAfter(element);
				}
			},
			submitHandler: function (form) {
				let _form = $(form).serializeArray();
				form = [form[0].value, form[1].value, form[2].value, form[3].value, "", "", ""];
				let data = system.ajax(system.host('do-signUp'),form);
				data.done(function(data){
					if(data != 0){
						localStorage.setItem('callback','kareer-oauth');
						localStorage.setItem('account',data);
						system.notification("Kareer","Success. You are now officially registered.");
						view.router.navigate('/account/');
					}
					else{
						system.notification("Kareer","Sign up failed.");
					}
				});
			}
		}); 
	},
	auth:function(form){
		var data = system.ajax(system.host('do-logInAuth'),form);
		data.done(function(data){
			data = JSON.parse(data);
			if(data[1] == 'applicant'){
				system.notification("Kareer","Signed in.");
				view.router.navigate('/account/');                        
			}
			else{
				system.notification("Kareer","You are not yet registered");
			}
		});
	}
}

auth = {
	ini:function(){
	},
	auto:function(email, id, auth){
        var data = system.ajax(system.host('do-logInAuth'),[email,id,auth]);
        data.done(function(data){
            data = JSON.parse(data);
            if(data[1] == 'applicant'){
                view.router.navigate('/account/');                        
            }
            else{
                system.notification("Kareer","Sign in failed.");
            }
        });
	},
	google:function(callback){
		gapi.load('auth2', function() {
			auth2 = gapi.auth2.init({
				client_id: '960874719503-0dhf2g79fc8dqkoalm7r9apsujtlnblc.apps.googleusercontent.com',
				cookiepolicy: 'single_host_origin',
			});
			callback();
		});
	},
	googleSignIn:function(element, callback){
		auth2.attachClickHandler(element,{},
			function(googleUser){
			localStorage.setItem('callback','google-oauth');
				let profile = googleUser.getBasicProfile();
				profile = {id: profile.getId(), last_name:profile.getFamilyName(), first_name:profile.getGivenName(), email:profile.getEmail(), picture:profile.getImageUrl()};
				localStorage.setItem('account',JSON.stringify(profile));
				sessionStorage.setItem('googleAccessToken', googleUser.getAuthResponse().id_token);
				view.router.navigate('/account/');
				callback();
			}, 
			function(error){
				system.notification('Google','Sign in canceled');
			}
		);
	},
	googleSignOut:function(){
		auth2.disconnect();
	},
	facebook:function(){
		openFB.init({appId: '407673386340765'});
	}
}