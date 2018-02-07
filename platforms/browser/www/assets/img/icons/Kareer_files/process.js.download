account = {
	ini:function(){
		console.log('hello world');
	},
	social_login:function(){
		console.log("xxx");
		$("#signin_facebook").on('click',function(){
			console.log("hello world");

			var fbLoginSuccess = function (userData) {
				console.log("UserInfo: ", userData);
			}

			console.log(facebookConnectPlugin);
			facebookConnectPlugin.login(["public_profile"], 
				function(user){
					console.log(user);
				},
				function loginError (error) {
					console.error(error)
				}
			);
		});	
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
							address:'Unit 8 Viliran Compound, P. Moran West, Lingayen, Pangasinan'
						},
						job:{
							title:'Front-End Developer',
							date:'January 31, 2018',
							requirements:`
										<ul>
											<li>Skills of a Front-End Developer.</li>
											<li>Skills of a Front-End Developer.</li>
											<li>Skills of a Front-End Developer.</li>
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
		                                        	<div class='row'>
			                                            <strong>Requirements:</strong>
		                                            	${post.job.requirements}
		                                        	</div>
		                                        </div>
		                                    </div>
		                                </div>
		                            </div>`);
		}
		this.scroll();
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