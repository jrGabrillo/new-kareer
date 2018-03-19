let server = "http://localhost/kareer";
account = {
	ini:function(){
		let data = this.get();
		this.display(data);
        jobs.display();
		app.toolbar.hide('#menu_job');
		$('.hide-toolbar-account-menu').on('click', function () {
			app.toolbar.hide('#menu_account');
		});

		$('.show-toolbar-account-menu').on('click', function () {
			app.toolbar.show('#menu_account');
		});

		$('.hide-toolbar-search-menu').on('click', function () {
			app.toolbar.hide('#menu_job');
		});

		$('.show-toolbar-search-menu').on('click', function () {
			app.toolbar.show('#menu_job');
		});

        new PerfectScrollbar('#tab_account .other-info'), scroll = 0;   
		$('#tab_account .other-info').on('ps-scroll-up', function(){
			scroll = $(this).scrollTop();
			if(scroll <= 10){
				$('#profile').removeClass('active');
			}
		}).on('ps-scroll-down', function(){
			scroll = $(this).scrollTop();
			if(scroll >= 10){
				$('#profile').addClass('active');
			}
		});

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
		$("#form_updateAcad").validate({
			rules: {
				field_acad_level: {required: true, maxlength: 50},
				field_acad_newschool: {required: true, maxlength: 50},
				field_acad_degree: {required: true, maxlength: 50},
				field_acad_units: {required: true, maxlength: 50},
				field_acad_newyearfrom: {required: true, maxlength: 50, year: true},
				field_acad_newyearto: {required: true, maxlength: 50, year: true, yearTo: 'field_acad_newyearfrom'},
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
				var _form = $(form).serializeArray(), degree = "";
				_form = [id[0],id[1],form[0].value,form[1].value,form[2].value,form[3].value,form[4].value,form[5].value];
                var data = system.ajax(system.host('do-updateAcademic'),_form);
                data.done(function(data){
                    if(data != 0){
		                system.notification("Kareer","Academic information has been updated.");
						degree = ((form[2].value == "") || (form[2].value == "null"))?"":form[2].value;
						$(`li[data-node='${id[0]}'] div.item-title`).html(`${form[1].value} <small>${degree}</small>`);
						$(`li[data-node='${id[0]}'] div.item-subtitle`).html(`${form[4].value} - ${form[5].value}`);
						app.popup.close('.popup-acad',true);
                    }
                    else{
                        system.notification("Kareer","Failed to updated.");
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
				let _data = $(this).data(), _career = [];
				$.each(data,function(i,v){
					if(v[0] == _data.node){ _career = v; return false;}
				})

				$("#field_career_agency").val(_career[2]);
				$("#field_career_position").val(_career[3]);
				$("#field_career_salary").val(_career[4]);
				$("#field_career_appointment").val(_career[5]);
				$("#field_career_yearfrom").val(_career[6]);
				$("#field_career_yearto").val(_career[7]);
				app.popup.open('.popup-career');
				career.update([_career[0],_career[1]]);
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
	update:function(id){
		$("#form_updateCareer").validate({
			rules: {
				field_career_agency: {required: true, maxlength: 300},
				field_career_position: {required: true, maxlength: 300},
				field_career_salary: {required: true, maxlength: 50, currency: true},
				field_career_appointment: {required: true, maxlength: 300},
				field_career_yearfrom: {required: true, maxlength: 50, year: true},
				field_career_yearto: {required: true, maxlength: 50, year: true, yearTo: 'field_career_yearfrom'},
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
				_form = [id[0],id[1],form[0].value,form[1].value,form[2].value,form[3].value,form[4].value,form[5].value];
                var data = system.ajax(system.host('do-updateCareer'),_form);
                data.done(function(data){
                    if(data != 0){
		                system.notification("Kareer","Career information has been updated.");
						$(`li[data-node='${id[0]}'] div.item-title`).html(`${_form[2]}`);
						$(`li[data-node='${id[0]}'] div.item-subtitle`).html(`${_form[3]} | ${_form[6]} - ${_form[7]}`);
						app.popup.close('.popup-career',true);
                    }
                    else{
                        system.notification("Kareer","Failed to update.");
                    }
                });
		    }
		});
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
	},
	get:function(id,min,max){
		min = ((typeof min == undefined) || (min == null))?0:min;
		max = ((typeof max == undefined) || (max == null))?10:max;
		var ajax = system.ajax(system.host('get-jobs'),[id,min,max]);
		return ajax.responseText;
	},
	display:function(){
		let id = localStorage.getItem('account_id');
        let count = 2, min = 0, max = count, swipe = true, _data = [],slides =  [];	
		let data = JSON.parse(jobs.get(id,min,count));
        let jobSwiper = new Swiper('#tab_jobs .swiper-container', {
            flipEffect: {
                rotate: 30,
                slideShadows: false,
            },
            init: false,
            preloadImages: true,
            updateOnImagesReady:true,
            speed: 800,
            spaceBetween: 10,                    
        });

        slides = jobs.process(data);
		jobSwiper.appendSlide(slides);
		jobSwiper.init();
		jobSwiper.on('reachEnd',function(){
			if(swipe){
	            min = max;
	            max = max+count;
				_data = JSON.parse(jobs.get(id,min,count));
		        slides = jobs.process(_data);
				jobSwiper.appendSlide(slides);
				swipe = (_data.length<1)?false:true;	
			}
		});

		jobSwiper.on('click',function(){
			let node = $(jobSwiper.clickedSlide).find('a').data('node');
			console.log(node);
		});

		jobSwiper.on('slideChange, transitionEnd', function () {
			if(jobSwiper.activeIndex == 15){
				jobSwiper.removeSlide([0,1,2,3,4]);
			}
		});
	},
	process:function(data){
		let jobArr = [], logo = "", skills = "", v = "", random = Math.floor(Math.random() * 100) + 1;
		if(data.length>1){
			$.each(data,function(i,v){
				skills = ""; random = Math.floor(Math.random() * 100) + 1;
				$.each(JSON.parse(v[6]),function(i2,v2){skills += `<div class="chip color-blue"><div class="chip-label">${v2} </div></div> `;});
				logo  = ((typeof v[9] == 'object') || (v[9] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${v[9]}`;
				jobArr.push(`<div class='swiper-slide'>
								<div class='card job'>
									<div class='card-header align-items-flex-end'>
										<div class='job_banner' style='background:url(${logo}); background-position:${random}% ${random}%;'></div>
										<a class="col button button-small button-fill button-round in-field-btn" data-cmd="read_company" data-node="${v[0]}">
											<i class="material-icons text-color-black">more_vert</i>
										</a>
										<div class='company'>
											<div class='logo-holder'>
												<div class='logo' style='background:url(${logo}) center/cover no-repeat;'></div>
											</div>
											<div class='information'>
												<h3>${v[8]}<br/><small>${v[10]}</small></h3>
											</div>
										</div>
									</div>
									<div class='card-content card-content-padding align-self-stretch'>
										<div class='job-description'>
											<h3>${v[5]}</h3>
											<p>${v[4]}</p>
											<div class='row'>
												<strong>Skills</strong><br/>
												${skills}
											</div>
											<div class='row'>
												<strong>Description</strong>
												<p>${v[3]}</p>
											</div>
										</div>
									</div>
									<div class="card-footer">
										<button class="button col button-round">Read more</button>
									</div>
								</div>
							</div>`);
			});
		}
		else if(data.length==1){
			skills = ""; v = data[0];
			$.each(JSON.parse(v[6]),function(i2,v2){skills += `<div class="chip color-blue"><div class="chip-label">${v2} </div></div> `;});
			logo  = ((typeof v[9] == 'object') || (v[9] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${v[9]}`;
			jobArr = `<div class='swiper-slide'>
						<div class='card job'>
							<div class='card-header align-items-flex-end'>
								<div class='job_banner' style='background:url(${logo}); background-position:${random}% ${random}%;'></div>
								<a class="col button button-small button-fill button-round in-field-btn" data-cmd="read_company" data-node="${v[0]}">
									<i class="material-icons text-color-black">more_vert</i>
								</a>							
								<div class='company'>
									<div class='logo-holder'>
										<div class='logo' style='background:url(${logo}) center/cover no-repeat;'></div>
									</div>
									<div class='information'>
										<h3>${v[8]}<br/><small>${v[10]}</small></h3>
									</div>
								</div>
							</div>
							<div class='card-content card-content-padding align-self-stretch'>
								<div class='job-description'>
									<h3>${v[5]}</h3>
									<p>${v[4]}</p>
									<div class='row'>
										<strong>Skills</strong><br/>
										${skills}
									</div>
									<div class='row'>
										<strong>Description</strong>
										<p>${v[3]}</p>
									</div>
								</div>
							</div>
							<div class="card-footer">
								<button class="button col button-round">Read more</button>
							</div>
						</div>
					</div>`;
		}
		else{
			jobArr = `<div class='swiper-slide end'><h1 class="text-align-center text-color-white">No more job fetched.</h1></div>`;
		}
		return jobArr;
	},
	view:function(){

	},
	viewCompany:function(){

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