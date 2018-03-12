let server = "http://localhost/kareer";
account = {
	ini:function(){
		let data = this.get();
		this.display(data);
        jobs.display();
		$('.hide-toolbar-account-menu').on('click', function () {
			app.toolbar.hide('#menu_account');
		});

		$('.show-toolbar-account-menu').on('click', function () {
			app.toolbar.show('#menu_account');
		});

        new PerfectScrollbar('#tab_account .other-info'), scroll = 0;                    
		skills.frontdisplay();
	},
	get:function(){
		let data = [localStorage.getItem('callback'),JSON.parse(localStorage.getItem('account'))];
        data = system.ajax(system.host('get-account'),[data[1]['email'],data[1]['id'],data[0]]);
		return JSON.parse(data.responseText);
	},
	settingsDisplay:function(){
		let data = this.get()[0];
        let ps = new PerfectScrollbar('#display_info .content');
		let auth = ((new RegExp('fb|google','i')).test(data[4]))? "hidden" : "";
        localStorage.setItem('account_id',data[0]);
        $("#display_accountLogin").addClass(auth);

        $("#field_fname").val(data[8]);
        $("#field_mname").val(data[10]);
        $("#field_lname").val(data[9]);
        $("#field_dob").val(data[12]);
        $("#field_address").html(data[13]);
        $("#field_number").val(data[15]);
        $("#field_bio").html(data[1]);

        $("#field_email").val(data[2]);

		var from = new Date((new Date()).getFullYear()-18, 1, 1);
		var calendarModal = app.calendar.create({
			inputEl: '#field_dob',
			openIn: 'customModal',
			footer: true,
			firstDay:0,
			value:[data[12]],
		    disabled: {from: from}
		});

		skills.display();
        this.update();
	},
	display:function(data){
		data = data[0];
		let tempPicture = `${server}/assets/images/logo/icon.png`, picture = ((new RegExp('facebook|googleusercontent','i')).test(data[19]))? data[19] : ((typeof data[19] == 'object') || (data[19] == ""))? tempPicture : `${server}/assets/images/logo/${data[19]}`;

		$('#profile img').attr({'src':`${picture}`});
		$('#profile h3.fullname').html(`${data[8]} ${data[10]} ${data[9]}`);
		$('#profile p.about').html(data[1]);

		$(`#profile img`).on('error',function(){
			$(this).attr({'src':tempPicture});
		});
	},
	update:function(){
		let c = 0;
		$(".item-input-password-preview").on('click',function(){
			c++;
			if((c%2)==0){
				$(this).children('i').html('visibility_off');
				$("input[name='field_password']").attr({'type':'password'});
			}
			else{
				$(this).children('i').html('visibility');
				$("input[name='field_password']").attr({'type':'text'});
			}
		});

		$("*[ data-cmd='field']").on('change',function(){
			let data = $(this).data(), val = $(this).val(), id = localStorage.getItem('account_id');			
			let status = 0;

			console.log(data.prop);
			if((data.prop == 'field_fname') && (val.length >= 1) && (val.length <= 100)){
				status = 1;
			}
			else if((data.prop == 'field_mname') && (val.length >= 1) && (val.length <= 100)){
				status = 1;
			}
			else if((data.prop == 'field_lname') && (val.length >= 1) && (val.length <= 100)){
				status = 1;
			}
			else if((data.prop == 'field_dob') && (val.length >= 1) && (val.length <= 20)){
				status = 1;
			}
			else if((data.prop == 'field_address') && (val.length >= 1) && (val.length <= 300)){
				status = 1;
			}
			else if((data.prop == 'field_number') && (val.length >= 1) && (val.length <= 100)){
				status = 1;
			}
			else if((data.prop == 'field_bio') && (val.length >= 1) && (val.length <= 1000)){
				status = 1;
			}
			else if((data.prop == 'field_email') && (val.length >= 1) && (val.length <= 100) && (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))){
				status = 1;
			}
			else if((data.prop == 'field_password') && (val.length >= 1) && (val.length <= 100)){
				if((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,50}/.test(val))){
					status = 1;
					$(".error_field_password").html('');
				}
				else{
					$(".error_field_password").html('Password is weak');				
				}
			}

			if(status){
				let ajax = system.ajax(system.host('do-updateInfo'),['applicant',data.prop,id,val]);
				ajax.done(function(data){
					console.log(data);
				});
			}
		})
	}
}

skills = {
	get:function(id){
		var ajax = system.ajax(system.host('get-skills'),id);
		return ajax.responseText;
	},
	display:function(){
		let data = account.get()[0], id = localStorage.getItem('account_id'), _skills = JSON.parse(this.get(id));

        if(_skills.length>0){
        	$.each(_skills,function(i,v){
        		$("#display_skills .block").append(`
					<div class="chip" id='${v[0]}'>
						<div class="chip-label">${v[1]}</div>
						<a data-node='${v[0]}' data-cmd='deleteSkill' class="chip-delete"></a>
					</div>
        		`);
        	})
        }
        else{
        	$("#display_skills .block").html("<h5 class='text-color-gray text-align-center'>- No information to show -</h5>");        	
        }

        this.add();
        this.remove();
	},
	frontdisplay:function(){
		let data = account.get()[0], id = localStorage.getItem('account_id'), _skills = JSON.parse(this.get(id));

		$(".skills.block").html("");
        if(_skills.length>0){
        	$.each(_skills,function(i,v){
        		$(".skills.block").append(`
					<div class="chip" id='${v[0]}'>
						<div class="chip-label">${v[1]}</div>
					</div>
        		`);
        	})
        }
        else{
        	$(".skills.block").html("<h5 class='text-color-gray text-align-center'>- No skills -</h5>");        	
        }

        this.add();
        this.remove();
	},
	add:function(){
		$("a#btn_addSkill").on('click',function(){
			let val = $('#field_skill').val(), id = localStorage.getItem('account_id');

			let ajax = system.ajax(system.host('do-addSkill'),['applicant','skill',id,val]);
			ajax.done(function(data){
				console.log(data);
				if(data != 0){
					$('#field_skill').val("");
	        		$("#display_skills .block").append(`
						<div class="chip" id='${data}'>
							<div class="chip-label">${val}</div>
							<a data-node='${data}' data-cmd='deleteSkill' class="chip-delete"></a>
						</div>
	        		`);
	        		$(".skills.block").append(`
						<div class="chip">
							<div class="chip-label">${val}</div>
						</div>
	        		`);

                    system.notification("Kareer",`Success. ${val} skill has been added.`);
				}
				else{
                    system.notification("Kareer","Failed. Try again later.");
				}
			});
		});
	},
	remove:function(){
		let id = localStorage.getItem('account_id');
		$("a[data-cmd='deleteSkill']").on('click',function(){
			let data = $(this).data();
			let ajax = system.ajax(system.host('do-deleteSkill'),['applicant','skill',data.node]);
			ajax.done(function(_data){
				if(_data == 1){
					$(`#${data.node}`).remove();
                    system.notification("Kareer",`Skill has been removed.`);
				}
				else{
                    system.notification("Kareer","Failed. Try again later.");
				}
			});
		});
	}

}

academic = {
	ini:function(){
		let id =  localStorage.getItem('account_id');
		let data = JSON.parse(this.get(id));

		this.display(data);
		this.add(id);
	},
	get:function(id){
		var ajax = system.ajax(system.host('get-academic'),id);
		return ajax.responseText;
	},
	display:function(data){
		let degree = "";

		if(data.length>0){
			$.each(data,function(i,v){
				degree = ((v[4] == "") || (v[4] == "null"))?"":v[4];
				$("#list_schools .list ul").append(`
					<li class="swipeout" data-node='${v[0]}'>
						<a class="item-link item-content swipeout-content" data-node='${v[0]}' data-cmd='open-popupAcad'>
							<div class="item-media"><i class='material-icons text-color-gray'>school</i></div>
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title">
										${v[3]} <small>${degree}</small>
									</div>
								</div>
								<div class="item-subtitle">${v[6]} - ${v[7]}</div>
							</div>
						</a>
					    <div class="swipeout-actions-right">
					        <a data-cmd='delete-acad'><i class='material-icons'>close</i></a>
					    </div>
					</li>
				`);
			});			
        	$("#list_schools .list ul li:nth-child(1)").remove();        	
        	$("#list_schools a.btn-nav").removeClass('hidden');

			$(`a[data-cmd='open-popupAcad']`).on('click', function(){
				let _data = $(this).data(), acad = [];
				$.each(data,function(i,v){
					if(v[0] == _data.node){ acad = v; return false;}
				})

				console.log(acad);
				$("#display_acad_fielddegree").attr({"style":"display:none;"});
				$("#display_acad_fieldunit").attr({"style":"display:none;"});

				if((new RegExp('Elementary|High School','i')).test(acad[2])){
					$("#display_acad_fielddegree").attr({"style":"display:none;"});
					$("#display_acad_fieldunit").attr({"style":"display:none;"});
					$("#field_acad_degree").val("null");
					$("#field_acad_units").val("null");
				}
				else{
					$("#display_acad_fielddegree").attr({"style":"display:block;"});
					$("#display_acad_fieldunit").attr({"style":"display:block;"});
					$("#field_acad_degree").val("");
					$("#field_acad_units").val("");
				}




				$("#field_acad_level").val(acad[2]);
				$("#field_acad_school").html(acad[3]);
				$("#field_acad_degree").val(acad[4]);
				$("#field_acad_units").val(acad[5]);
				$("#field_acad_yearfrom").val(acad[6]);
				$("#field_acad_yearto").val(acad[7]);
				app.popup.open('.popup-acad');

				console.log([acad[0],acad[1]]);
				academic.update([acad[0],acad[1]]);
			});

			$(`a[data-cmd='delete-acad']`).on('click', function(){
				let __data = $(this).parents().find('li.swipeout.swipeout-opened a.item-link').data('node');
				academic.delete(__data);
			});
        }
		else{
        	$("#list_schools a.btn-nav").addClass('hidden');        	
		}
	},
	add:function(id){
		$("#display_newacad_fielddegree").attr({"style":"display:none;"});
		$("#display_newacad_fieldunit").attr({"style":"display:none;"});
		$("#field_newacad_level").on('change',function(){
			let val = $(this).val();
			if((new RegExp('Elementary|High School','i')).test(val)){
				$("#display_newacad_fielddegree").attr({"style":"display:none;"});
				$("#display_newacad_fieldunit").attr({"style":"display:none;"});
				$("#field_newacad_degree").val("null");
				$("#field_newacad_units").val("null");
			}
			else{
				$("#display_newacad_fielddegree").attr({"style":"display:block;"});
				$("#display_newacad_fieldunit").attr({"style":"display:block;"});
				$("#field_newacad_degree").val("");
				$("#field_newacad_units").val("");
			}
		})

		$("#form_newAcad").validate({
			rules: {
				field_newacad_level: {required: true, maxlength: 50},
				field_newacad_newschool: {required: true, maxlength: 50},
				field_newacad_degree: {required: true, maxlength: 50},
				field_newacad_units: {required: true, maxlength: 50},
				field_newacad_newyearfrom: {required: true, maxlength: 50, year: true},
				field_newacad_newyearto: {required: true, maxlength: 50, year: true, yearTo: 'field_newyearfrom'},
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
				var _form = $(form).serializeArray(),data = 0;
				_form = [data,id,form[0].value,form[1].value,form[2].value,form[3].value,form[4].value,form[5].value];
                var data = system.ajax(system.host('do-addAcademic'),_form);
                data.done(function(data){
                	_form[0] = data;
                    if(data != 0){
                        system.notification("Kareer","New Academic information has been added.");
						app.popup.close('.popup-newAcad',true);
						academic.display([_form]);
                    }
                    else{
                        system.notification("Kareer","Failed to add.");
                    }
                });
		    }
		});
	},
	update:function(id){
		console.log(id);
		$("#form_updateAcad").validate({
			rules: {
				field_acad_level: {required: true, maxlength: 50},
				field_acad_newschool: {required: true, maxlength: 50},
				field_acad_degree: {required: true, maxlength: 50},
				field_acad_units: {required: true, maxlength: 50},
				field_acad_newyearfrom: {required: true, maxlength: 50, year: true},
				field_acad_newyearto: {required: true, maxlength: 50, year: true, yearTo: 'field_newyearfrom'},
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
				console.log(id);
				var _form = $(form).serializeArray();
				_form = [id[0],id[1],form[0].value,form[1].value,form[2].value,form[3].value,form[4].value,form[5].value];
                var data = system.ajax(system.host('do-updateAcademic'),_form);
                data.done(function(data){
                    if(data != 0){
                        system.notification("Kareer","Academic information has been updated.");

						$("#field_acad_level").val(form[0].value);
						$("#field_acad_school").html(form[1].value);
						$("#field_acad_degree").val(form[2].value);
						$("#field_acad_units").val(form[3].value);
						$("#field_acad_yearfrom").val(form[4].value);
						$("#field_acad_yearto").val(form[5].value);

                    }
                    else{
                        system.notification("Kareer","Failed to add.");
                    }
                });
		    }
		});
	},
	delete:function(id){
        var data = system.ajax(system.host('do-deleteAcademic'),id);
        data.done(function(data){
            if(data != 0){
                system.notification("Kareer","Academic information has been deleted.");
				app.swipeout.delete(`li[data-node='${id}']`);
            }
            else{
                system.notification("Kareer","Failed to delete.tttt");
            }
        });
	}
}

career = {
	ini:function(){
		let id =  localStorage.getItem('account_id');
		let data = JSON.parse(this.get(id));

		this.display(data);
		this.add(id);
		this.update(data);
	},
	get:function(id){
		var ajax = system.ajax(system.host('get-career'),id);
		return ajax.responseText;
	},
	display:function(data){
		let degree = "";
		if(data.length>0){
			$.each(data,function(i,v){
				degree = ((v[4] == "") || (v[4] == "null"))?"":v[4];
				$("#list_jobs .list ul").append(`
					<li class="swipeout" data-node='${v[0]}'>
						<a class="item-link item-content swipeout-content" data-node='${v[0]}' data-cmd='open-popupCareer'>
							<div class="item-media"><img src="http://www.rnrdigitalconsultancy.com/assets/images/rnrdigitalconsultancy.png" width="44"/></div>
							<div class="item-inner">
								<div class="item-title-row">
									<div class="item-title">
										${v[2]}
									</div>
								</div>
								<div class="item-subtitle">
									${v[3]} | ${v[6]} - ${v[7]}
								</div>
							</div>
						</a>
					    <div class="swipeout-actions-right">
					        <a data-cmd='delete-career'><i class='material-icons'>close</i></a>
					    </div>
					</li>
				`);
			});			
        	$("#list_jobs .list ul li:nth-child(1)").remove();        	
        	$("#list_jobs a.btn-nav").removeClass('hidden');        	

			$(`a[data-cmd='open-popupCareer']`).on('click', function(){
				let _data = $(this).data(), career = [];
				$.each(data,function(i,v){
					if(v[0] == _data.node){ career = v; return false;}
				})

				$("#field_career_agency").val(career[2]);
				$("#field_career_position").val(career[3]);
				$("#field_career_salary").val(career[4]);
				$("#field_career_appointment").val(career[5]);
				$("#field_career_yearfrom").val(career[6]);
				$("#field_career_yearto").val(career[7]);
				app.popup.open('.popup-career');
			});

			$(`a[data-cmd='delete-career']`).on('click', function(){
				let __data = $(this).parents().find('li.swipeout.swipeout-opened a.item-link').data('node');
				career.delete(__data);
			});
		}
		else{
        	$("#list_jobs a.btn-nav").addClass('hidden');        	
		}
	},
	add:function(id){
		let calendarFromModal = app.calendar.create({
			inputEl: '#field_career_yearfrom',
			openIn: 'customModal',
			footer: true,
			firstDay:0,
		});

		let calendarToModal = app.calendar.create({
			inputEl: '#field_career_yearto',
			openIn: 'customModal',
			footer: true,
			firstDay:0,
		});

		$("#form_newCareer").validate({
			rules: {
				field_newcareer_agency: {required: true, maxlength: 300},
				field_newcareer_position: {required: true, maxlength: 300},
				field_newcareer_salary: {required: true, maxlength: 50, currency: true},
				field_newcareer_appointment: {required: true, maxlength: 300},
				field_newcareer_yearfrom: {required: true, maxlength: 50, year: true},
				field_newcareer_yearto: {required: true, maxlength: 50, year: true, yearTo: 'field_career_yearfrom'},
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
				var _form = $(form).serializeArray(),data = 0;
				_form = [data,id,form[0].value,form[1].value,form[2].value,form[3].value,form[4].value,form[5].value];
                var data = system.ajax(system.host('do-addCareer'),_form);
                data.done(function(data){
                	_form[0] = data;
                    if(data != 0){
                        system.notification("Kareer","New career information has been added.");
						app.popup.close('.popup-newCareer',true);
						career.display([_form]);
                    }
                    else{
                        system.notification("Kareer","Failed to add.");
                    }
                });
		    }
		});
	},
	update:function(data){
		console.log(data);
	},
	delete:function(id){
        var data = system.ajax(system.host('do-deleteCareer'),id);
        data.done(function(data){
            if(data != 0){
                system.notification("Kareer","Career information has been deleted.");
				app.swipeout.delete(`li[data-node='${id}']`);
            }
            else{
                system.notification("Kareer","Failed to delete.");
            }
        });
	}
}

jobs = {
	ini:function(){
		console.log('jobs initialized');
        var mySwiper = new Swiper('#tab_jobs .swiper-container', {
            flipEffect: {
                rotate: 30,
                slideShadows: false,
            },
            speed: 800,
            spaceBetween: 10,                    
        });		
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
                	console.log(data);
                    data = JSON.parse(data);
                    if(data[1] == 'applicant'){
                        system.notification("Kareer","Signed in.");
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
		setTimeout(function(){
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
		},1000);
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