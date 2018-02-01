account = {
	ini:function(){
		console.log('hello world');
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
							requirements:'Skills of a Front-End Developer.',
							description:'We are in need of Front-End Developers, who are passionate and highly motivated in making great ideas into reality.',
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
							requirements:'Skills of an Operations Manager.',
							description:'We are in need of Operations Managers, who are passionate and highly motivated in operating farm industry.',
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
							requirements:'Skills of a Pen Maker.',
							description:'We are in need of Pen Makers, who are passionate and highly motivated in making pen products.',
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
							requirements:'Skills of a wood carver.',
							description:'We are in need of Wood Carvers, who are passionate and highly motivated in carving bench furnitures.',
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
							requirements:'Skills of a Chief Technlogy Officer',
							description:'We are in need of a Chief Technlogy Officer, who are passionate and highly motivated in leading.',
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
		                                            <div class='logo'><img src='assets/img/logo/${post.company.logo}' width='100%'></div>
		                                            <div class='information'>
		                                                <h3>${post.company.name}</h3>
		                                                <span>${post.company.address}</span>
		                                            </div>
		                                        </div>
		                                    </div>
		                                    <div class='card-content card-content-padding align-self-stretch'>
		                                        <div class='job-description'>
		                                        	<h3>${post.job.title}</h3>
		                                        	<p><span>${post.job.date}</span></p>
		                                            <strong>Requirements:</strong>
		                                            <ul>
		                                            	<li>${post.job.requirements}</li>
		                                            </ul>
		                                            <strong>Description</strong>
	                                            	<ul>
		                                            	<li>${post.job.description}</li>
		                                            </ul>
		                                        </div>
		                                    </div>
		                                </div>
		                            </div>`);
		}
		jobs.scroll();
	},
	scroll:function(){
		$(".card-content").on( 'scroll', function(){
			let scrolled = $(this).scrollTop();
		   	if(scrolled >= 25){
		   		$(this).parent('.card').addClass('active');
		   	}
		   	else{
		   		$(this).parent('.card').removeClass('active');
		   	}
		});
	}
}

search = {
	ini:function(){
		
	}
}