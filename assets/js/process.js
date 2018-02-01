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
							logo:'',
							name:'RNR Digital Consultancy',
							address:''
						},
						job:{
							title:'',
							date:'',
							requirements:'',
							description:'',
						}
					},
					{
						company:{
							logo:'',
							name:'Company 2',
							address:''
						},
						job:{
							title:'',
							date:'',
							requirements:'',
							description:'',
						}
					},
					{
						company:{
							logo:'',
							name:'Company 3',
							address:''
						},
						job:{
							title:'',
							date:'',
							requirements:'',
							description:'',
						}
					},
					{
						company:{
							logo:'',
							name:'Company 4',
							address:''
						},
						job:{
							title:'',
							date:'',
							requirements:'',
							description:'',
						}
					},
					{
						company:{
							logo:'',
							name:'Company 5',
							address:''
						},
						job:{
							title:'',
							date:'',
							requirements:'',
							description:'',
						}
					},
					];
		return data;
	},
	display:function(){
		let display = "";
		for(let job of this.get()){
			$('#display_jobs').append(`<div class='swiper-slide'>
		                                <div class='card job'>
		                                    <div class='card-header align-items-flex-end'>
		                                        <div class='company'>
		                                            <div class='logo'><img src='assets/img/logo/rnr_logo.png' width='100%'></div>
		                                            <div class='information'>
		                                                <h3>${job.company.name}</h3>
		                                                <span>Lingayen, Pangasinan</span>
		                                            </div>
		                                        </div>
		                                    </div>
		                                    <div class='card-content card-content-padding align-self-stretch'>
		                                        <div class='job-description'>
		                                            <span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</span>
		                                            <span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</span>
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