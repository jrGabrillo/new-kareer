let h = window.innerHeight, w = window.innerWidth;
let host = window.location;
// let server = `http://system.kareer-ph.com/`;
let server = `http://localhost/kareer`;
let slides = [], count = 5, min = 0, max = count;

account = {
	ini:function(){
		let data = this.get()[0], scroll = 0, badge ="";   
		this.display(data);
		app.toolbar.hide('#menu_account');
		app.tab.show('#tab_jobs');

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
		$.each(JSON.parse(notifications.get(account.id())),function(i,v){
			if(v[6] == 1){
				badge+=v[6];
			}
		});
		console.log(badge.length);
		$('span.badge.notif').html((badge.length > 0)?badge.length:'0');
		$('span.badge.chat').html('0');


	},
	id:function(){
		return localStorage.getItem('account_id');
	},
	get:function(){
		let data = [localStorage.getItem('callback'),JSON.parse(localStorage.getItem('account'))];
		(data[0] == null)?account.logout():"";
        data = system.ajax(system.host('get-account'),[data[1]['email'],data[1]['id'],data[0]]);
		return JSON.parse(data.responseText);
	},
	settingsDisplay:function(){
		let data = this.get()[0], ps = new PerfectScrollbar('#display_info .content'), auth = ((new RegExp('fb|google','i')).test(data[4]))? "hidden" : "";
		let tempPicture = `${server}/assets/images/logo/icon.png`, picture = ((new RegExp('facebook|googleusercontent','i')).test(data[19]))? data[19] : ((typeof data[19] == 'object') || (data[19] == ""))? tempPicture : `${server}/assets/images/logo/${data[19]}`;

		$('#display_accountPicture img').attr({'src':`${picture}`});
        $("._gname").val(data[8]);
        $("._mname").val(data[10]);
        $("._lname").val(data[9]);
        $("._address").html(data[13]);
        $("._number").val(data[15]);
        $("._bio").html(data[1]);
        $("._email").val(data[2]);
        $(`._gender option[value='${data[11]}']`).attr({'selected':true});

        let dob = (data[12] == "")?"January 26, 1993":data[12];
		let from = new Date((new Date()).getFullYear()-18, 1, 1);
		app.calendar.create({
			inputEl: '#field_dob',
			openIn: 'customModal',
			dateFormat: 'MM dd, yyyy',
			footer: true,
			firstDay:0,
			value:[dob],
		    disabled: {from: from}
		});
        this.update(data[0]);
		this.updatePassword(data[0]);
		this.updatePicture(data[0]);
		$(`#display_accountPicture img`).on('error',function(){
			$(this).attr({'src':tempPicture});
		});
	},
	display:function(data){
		skills.frontdisplay();
		let tempPicture = `${server}/assets/images/logo/icon.png`, picture = ((new RegExp('facebook|googleusercontent','i')).test(data[19]))? data[19] : ((typeof data[19] == 'object') || (data[19] == ""))? tempPicture : `${server}/assets/images/logo/${data[19]}`;
		let name = `${(data[8]!=null)?data[8]:''} ${(data[10]!=null)?data[10]:''} ${(data[9]!=null)?data[9]:''}`;
		let about = (data[1] == "")?`Describe yourself. <a href="/personal-info/">Add your bio now </a>`:data[1];

		$('#profile img').attr({'src':picture});
		$('#profile h3.fullname').html(name);
		$('#profile p.about').html(about);

		$(`#profile img`).on('error',function(){
			$(this).attr({'src':tempPicture});
		});
	},
	update:function(id){
		$("#form_personalInfo").validate({
		    rules: {
		        field_fname: {required: true,maxlength: 100},
		        field_mname: {required: true,maxlength: 100},
		        field_lname: {required: true,maxlength: 100},
		        field_dob: {required: true,maxlength: 100},
		        field_address: {required: true,maxlength: 300},
		        field_number: {required: true,maxlength: 50},
		        field_gender: {required: true,maxlength: 50},
		        field_email: {required: true,maxlength: 100,email:true},
		        field_bio: {required: true,maxlength: 1000},
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
		}); 

		$("#button_personalInfo").on('click',function(){
			if($("#form_personalInfo").validate().form()){
				let _form = $("#form_personalInfo").serializeArray();
		    	app.preloader.show();
		    	_form = [id,_form[0]['value'],_form[1]['value'],_form[2]['value'],_form[3]['value'],_form[4]['value'],_form[5]['value'],_form[6]['value'],_form[7]['value'],_form[8]['value']];
				
				console.log(_form);
				let ajax = system.ajax(system.host('do-updateInfo'),_form);
				ajax.done(function(data){
			    	app.preloader.hide();				
					if(data == 1){
				        $("._gname").html(_form[1]);
				        $("._mname").html(_form[2]);
				        $("._lname").html(_form[3]);
				        $("._dob").html(_form[4]);
				        $("._address").html(_form[5]);
				        $("._number").html(_form[7]);
				        $("._bio").html(_form[9]);
				        $("._email").html(_form[8]);
				        $(`._gender`).html(_form[6]);
	                    system.notification("Kareer",`Updated`);
					}
					else{
	                    system.notification("Kareer",`Update failed`);
					}
				});
			}
		});
	},
	updatePassword:function(id){
		$(".item-input-password-preview").on('click',function(){
			let preview = $(this).data('show');
			if($(`input[name='${preview}']`)[0].type=="text"){
				$(`.${preview}`).html('visibility_off');
				$(`input[name='${preview}']`).attr({'type':'password'});
			}
			else{
				$(`.${preview}`).html('visibility');
				$(`input[name='${preview}']`).attr({'type':'text'});
			}
		});

		$("#form_password").validate({
		    rules: {
		        field_oldPassword: {required: true, maxlength: 100, validatePassword:true, checkPassword:account.id()},
		        field_newPassword: {required: true, maxlength: 100, validatePassword:true},
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
		}); 

		$("#button_accountInfo").on('click',function(){
			if($("#form_password").validate().form()){
				let _form = $("#form_password").serializeArray();
				_form = [account.id(),_form[0]['value'],_form[1]['value']];
				if(_form[1] == _form[2]){
                    system.notification("Kareer",`Please enter a password that you haven't used before.`);
				}
				else{
			    	app.preloader.show();
					let ajax = system.ajax(system.host('do-updatePassword'),_form);
					ajax.done(function(data){
				    	app.preloader.hide();				
						if(data == 1){
							$("#form_password input").val("");
		                    system.notification("Kareer",`Password updated`);
						}
						else{
		                    system.notification("Kareer",`Password update failed`);
						}
					});
				}
			}
		});

	},
	updatePicture: function(id) {
        window.Cropper;
        var user = id;
        var picture = `${server}/assets/images/logo/icon.png`;
        var content = `<div class='image-crop col s12'>
                            <img width='100%' src='${picture}' id='change_picture'>
                        </div>
                        <div class='crop-options col'>
                        	<p><label for='inputImage' class='button button-outline button-round tooltipped' data-tooltip='Load image' data-position='left'>
                                <input type='file' accept='image/*' name='file' id='inputImage' class='hidden'>
                                Upload Picture
                            </label></p>
                        	<p class='hidden'><a class="button button-outline button-round" data-cmd='take-a-photo'>Take a photo</a></p>
                        	<p><a class="button button-outline button-round" data-cmd='save'>Save</a></p>
                        	<p><a class="button button-outline button-round" data-cmd='cancel' data-position='right'>Cancel</a></p>
                        </div>`;
        $("#profile_picture2").html(content);

        var $inputImage = $("#inputImage");
        var status = true;
        if (window.FileReader) {
            $inputImage.change(function(e) {
                var fileReader = new FileReader(),
                    files = this.files,
                    file;
                file = files[0];

                if (/^image\/\w+$/.test(file.type)) {
                    fileReader.readAsDataURL(file);
                    fileReader.onload = function(e) {
                        $inputImage.val("");
                        $("a[data-cmd='save']").html("Save").removeClass('disabled');
                        $('#change_picture').attr('src', e.target.result);
                        var image = document.getElementById('change_picture');
                        var cropper = new Cropper(image, {
                            aspectRatio: 1 / 1,
                            autoCropArea: 0.80,
                            ready: function() {
                                $("a[data-cmd='save']").removeClass('hidden');
                                $("a[data-cmd='rotate']").removeClass('hidden');

                                $("a[data-cmd='save']").click(function() {
                                    $(this).html("Uploading...").addClass('disabled');
                                    if (status) {
                                        var data = system.ajax(system.host('do-updateImage'),[user, 'picture', cropper.getCroppedCanvas().toDataURL('image/png')]);
                                        data.done(function(data) {
                                        	console.log(data);
                                            if (data == 1) {
                                            	app.popup.close('.popup-picture',true);
                                                account.ini();
                                                system.notification("Kareer",`Picture Uploaded.`);
                                            } 
                                            else {
                                            	system.notification("Kareer",`Failed to upload your picture. File too large.`);
                                            }
                                        });
                                        status = false;
                                    }
                                });
                            }
                        });
                    };
                } 
                else {
                    showMessage("Please choose an image file.");
                }
            });
        }
        else {
            $inputImage.addClass("hidden");
        }
    },
	logout:function(){
		localStorage.clear();
		view.router.navigate('/home/');
	}
}

skills = {
	get:function(id){
		var ajax = system.ajax(system.host('get-skills'),id);
		console.log()
		return ajax.responseText;
	},
	display:function(){
		let data = account.get()[0], id = account.id(), _skills = JSON.parse(this.get(id));

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
		let data = account.get()[0], id = account.id(), _skills = JSON.parse(this.get(id));
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
        	$(".skills.block").html(`No skills yet. <a href="/settings_skills/">Add skills</a>`);        	
        }

        this.add();
        this.remove();
	},
	add:function(){
		$("a#btn_addSkill").on('click',function(){
			let val = $('#field_skill').val(), id = account.id();

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
                    skills.frontdisplay();
				}
				else{
                    system.notification("Kareer","Failed. Try again later.");
				}
			});
		});
	},
	remove:function(){
		let id = account.id();
		$("a[data-cmd='deleteSkill']").on('click',function(){
			let data = $(this).data();
			let ajax = system.ajax(system.host('do-deleteSkill'),['applicant','skill',id, data.node]);
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
		let id =  account.id();
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
		let id =  account.id();
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
        this.display();
        setTimeout(function(){
			if(localStorage.getItem('load') != null){
				$('.load-block').remove();
				localStorage.removeItem('load');
			}
        },1500);
	},
	get:function(id,min,max){
		min = ((typeof min == undefined) || (min == null))?0:min;
		max = ((typeof max == undefined) || (max == null))?10:max;
		var ajax = system.ajax(system.host('get-jobs1'),[id,min,max]);
		return ajax.responseText;
	},
	loadMore:function(trigger){
		if(trigger){
            min = max;
            max = max+count;
	        slides = jobs.process(JSON.parse(jobs.get(account.id(),min,count)));

	        if((typeof slides) == "string"){
	        	trigger = false;
		        $("#tab_jobs ul").html(slides);
	        }
	        else{
		        $.each(slides,function(i,v){
			        $("#tab_jobs ul").prepend(v);
		        });
				$("#tab_jobs").jTinder({
				    onDislike: function (item){
				    	app.preloader.show();
						setTimeout(function () {
							app.preloader.hide();
					    	$("#tab_jobs ul li.previous").remove();
						},2000);

				        jobs.loadMore(($("#tab_jobs ul li").length - 1) <= 1);
				    },
				    onLike: function (item){
				    	app.preloader.show();
						setTimeout(function () {
							app.preloader.hide();
					    	$("#tab_jobs ul li.previous").remove();
						},2000);

	    				job_id = $("#tab_jobs ul li.active").data('node');
						job.apply([job_id,account.id()]);

				        jobs.loadMore(($("#tab_jobs ul li").length - 1) == 0);
				    },
					animationRevertSpeed: 200,
					animationSpeed: 400,
					threshold: 1,
					likeSelector: '.like',
					dislikeSelector: '.dislike'
				});
	        }
		}
	},
	display:function(){
		let swipe=true,_data=[],job_id="",business_id="",jobData="",skills="",logo="",jobAbout="",companyAbout="",ps_job="",ps_business="",business_data="";	
		let id = account.id(),data = JSON.parse(jobs.get(id,min,count));
        jobs.loadMore(true);

		$("#menu_job .job_next").on('click',function(){
			$("#tab_jobs").jTinder('dislike');
		});
		$("#menu_job .job_bookmark").on('click',function(){
			job_id = $("#tab_jobs ul li.active").data('node');
			job.bookmark([job_id,id]);
			$("#tab_jobs").jTinder('dislike');
		});
		$("#menu_job .job_apply").on('click',function(){
			job_id = $("#tab_jobs ul li.active").data('node');
			job.apply([job_id,id]);
			$("#tab_jobs").jTinder('like');
		});

		$('button[data-cmd="read_job"]').on('click',function(){
			job_id = $(this).data('node');
			jobData = JSON.parse(job.get(job_id))[0];
			skills = "";
			$.each(JSON.parse(jobData[2]),function(i,v){skills += `<div class="chip color-blue"><div class="chip-label">${v}</div></div> `;});
			logo  = ((typeof jobData[9] == 'object') || (jobData[9] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${jobData[9]}`;
			jobAbout = app.popover.create({
				targetEl: '.company',
				content: `<div class="popover" id='display_job'>
							<div class='panel-company'>
						        <div style='height:${h}px !important;'>
						            <div class="row business-info">
						                <div class="company-background">
						                    <a class="popover-close close button button-large button-fill button-round bg-color-white in-field-btn ripple-color-green"><i class='material-icons text-color-gray'>close</i></a>
						                    <img src="${logo}" width='100%'>                    
						                </div>
						                <div class="company">
						                    <h3 class="">${jobData[7]}</h3>
						                </div>
						            </div>
						            <div class="row job-title">
						                <h1>${jobData[0]} <small class="text-color-gray">${jobData[1]}</small></h1>
						            </div>
						            <div class="row job-skills">
						                <h4>Skills</h4>
						                <div class="content">${skills}</div>
						            </div>
						            <div class="row job-salary">
						                <h4>Salary Range</h4>
						                <div class="content">${jobData[3]} - ${jobData[4]}</div>
						            </div>
						            <div class="row job-description">
						                <div class="content ">${jobData[5]}</div>
						            </div>
						        </div>
							</div>
						</div>`,
			});
			jobAbout.open();
            ps_job = new PerfectScrollbar('#display_job');
		});

		$(".company").on('click',function(){
			business_data = $(this).parents().find('li.active').data('business');
			business_data = JSON.parse(business.get(business_data))[0];
			logo  = ((typeof business_data[1] == 'object') || (business_data[1] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${business_data[1]}`;
			companyAbout = app.popover.create({
				targetEl: '.company',
				content: `<div class="popover" id='display_company'>
							<div class='panel-company'>
						        <div id='display_business' style='height:${h}px !important;'>
						            <div class="row business-info">
						                <div class="company-background">
			                    			<a class="popover-close close button button-large button-fill button-round bg-color-white in-field-btn ripple-color-green"><i class='material-icons text-color-gray'>close</i></a>
						                    <img src="${logo}" width='100%'>                    
						                </div>
						                <div class="company">
						                    <h3 class="name">${business_data[0]}</h3>
						                    <h6 class="address">${business_data[2]}</h6>
						                    <h6 class="email">Email: ${business_data[3]} | Phone: ${business_data[4]}</h6>
						                </div>
						            </div>
						            <div class="row company-description">
						                <div class="content">${business_data[5]}</div>
						            </div>
						        </div>
							</div>
						</div>`,
			});
			companyAbout.open();
            ps_business = new PerfectScrollbar('#display_business');
		});
	},
	process:function(data){
		let jobArr = [], logo = "", skills = "", v = "", random = Math.floor(Math.random() * 100) + 1;
		if(data.length>=1){
			$.each(data,function(i,v){
				skills = ""; random = Math.floor(Math.random() * 100) + 1;
				$.each(JSON.parse(v[6]),function(i2,v2){skills += `<div class="chip color-blue"><div class="chip-label">${v2}</div></div> `;});
				logo  = ((typeof v[10] == 'object') || (v[10] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${v[10]}`;
				jobArr.push(`<li data-node='${v[0]}' data-business="${v[2]}">
								<div class='card job'>
									<div class='card-header align-items-flex-end'>
										<div class='job_banner'></div>
										<div class='company'>
											<div class='logo-holder'>
												<div class='logo' style='background:url(${logo}) center/cover no-repeat; background-size: 50px;'></div>
											</div>
											<div class='information'>
												<h3>${v[9]}<br/><div class='single-ellipsis'>${v[11]}</div></h3>
											</div>
										</div>
									</div>
									<div class='card-content card-content-padding align-self-stretch' style='height:calc(${h}px - 320px);'>
										<div class='job-description'>
											<h3>${v[5]}</h3>
											<div class='row'>
												<strong>Skills</strong><br/>
												${skills}
											</div>
											<div class='row'>
												<strong>Description</strong>
												<p class='ellipsis'>${v[3]}</p>
											</div>
										</div>
									</div>
									<div class='card-footer'>
										<button class="col button button-round" data-cmd="read_job" data-node="${v[0]}">Read more</button>
									</div>
								</div>
							</li>`);
			});
		}
		else{
			jobArr = `<div class='end'><h1 class="text-align-center text-color-white">No more job fetched.</h1></div>`;
		}
		return jobArr;
	},
}

job = {
	get:function(data){
		var ajax = system.ajax(system.host('get-jobById'),data);
		return ajax.responseText;
	},
	bookmark:function(data){
        var data = system.ajax(system.host('do-jobBookmark'),data);
        data.done(function(data){
            // if(data == 1){
            //     system.notification("Kareer","Done.");
            // }
            // else if(data == 2){
            //     system.notification("Kareer","Done.");
            // }
            // else{
            //     system.notification("Kareer","Failed to apply.");
            // }
        });
	},
	apply:function(data){
        var data = system.ajax(system.host('do-jobApply'),data);
        data.done(function(data){
            // if(data == 1){
            //     system.notification("Kareer","Application sent.");
            // }
            // else if(data == 2){
            //     system.notification("Kareer","Already sent application to this job.");
            // }
            // else{
            //     system.notification("Kareer","Failed to apply.");
            // }
        });
	},
	display:function(data){
		let skills = "", logo = "";
		$.each(JSON.parse(data[2]),function(i,v){skills += `<div class="chip color-blue"><div class="chip-label">${v}</div></div> `;});
		logo  = ((typeof data[9] == 'object') || (data[9] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${data[9]}`;

		$("#display_job").html(`
            <div class="row job-title">
                <h1>${data[0]} <small class="text-color-gray">${data[1]}</small></h1>
                <div class="job-actions">
	                <a class="button button-large button-fill button-round bg-color-gray job_bookmark"><i class='material-icons text-color-white'>bookmark</i></a>  
		            <a class="button button-large button-fill button-round bg-color-green job_apply"><i class='material-icons text-color-white'>done</i></a> 
                </div>
            </div>
            <div class="row job-skills">
                <h4>Skills</h4>
                <div class="content">${skills}</div>
            </div>
            <div class="row job-salary">
                <h4>Salary Range</h4>
                <div class="content">${data[3]} - ${data[4]}</div>
            </div>
            <div class="row job-description">
                <div class="content ">${data[5]}</div>
            </div>
            <div class="row business-info">
                <h6>About the company: <br/></h6>
                <img src="${logo}" width='100%'>
                <div class="company">
                    <h3 class="name">${data[7]}</h3>
                    <h6 class="address">${data[8]}</h6>
                </div>
            </div>
		`);

		$("#display_job .job_bookmark").on('click',function(){
			let job_id = localStorage.getItem('job'), account_id = account.id();
			job.bookmark([job_id,account_id]);
		});
		$("#display_job .job_apply").on('click',function(){
			let job_id = localStorage.getItem('job'), account_id = account.id();
			job.apply([job_id,account_id]);
		});
	}
}

bookmark ={
	ini:function(){
		let id =  account.id();
		let data = JSON.parse(this.get(id));
		this.display(data);
	},
	get:function(data){
		var ajax = system.ajax(system.host('get-bookmarks'),data);
		return ajax.responseText;
	},
	display:function(data){
		let	picture = "", id="",ps_notif="";
		$.each(data,function(i,v){
			picture  = ((typeof v[2] == 'object') || (v[2] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${v[2]}`;
			$('#list_bookmarks ul').append(`<a class="item-link item-content" href="#" data-cmd="read_job" data-node="${v[0]}">
				<div class="item-media"><img src="${picture}" width="44"/></div>
				<div class="item-inner">
					<div class="item-title-row"><div class="item-title">${v[1]}</div></div>
					<div class="item-subtitle">${v[3]} | <small>${v[4]}</small></div>
				</div>
			</a>`);
		});		


		$(`#list_bookmarks .item-media img`).on('error',function(){
			$(this).attr({'src':`${server}/assets/images/logo/icon.png`});
		});

		$('a[data-cmd="read_job"]').on('click',function(){
			job_id = $(this).data('node');
			jobData = JSON.parse(job.get(job_id))[0];
			skills = "";
			$.each(JSON.parse(jobData[2]),function(i,v){skills += `<div class="chip color-blue"><div class="chip-label">${v}</div></div> `;});
			logo  = ((typeof jobData[9] == 'object') || (jobData[9] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${jobData[9]}`;
			jobAbout = app.popover.create({
				targetEl: '.company',
				content: `<div class="popover" id='display_job'>
							<div class='panel-company'>
						        <div style='height:${h}px !important;'>
						            <div class="row business-info">
						                <div class="company-background">
						                    <a class="popover-close close button button-large button-fill button-round bg-color-white in-field-btn ripple-color-green"><i class='material-icons text-color-gray'>close</i></a>
						                    <img src="${logo}" width='100%'>                    
						                </div>
						                <div class="company popover-close" data-business = '${jobData[10]}'>
						                    <h3 class="">${jobData[7]}</h3>
						                </div>
						            </div>
						            <div class="row job-title">
						                <h1>${jobData[0]} <small class="text-color-gray">${jobData[1]}</small></h1>
						            </div>
						            <div class="row job-skills">
						                <h4>Skills</h4>
						                <div class="content">${skills}</div>
						            </div>
						            <div class="row job-salary">
						                <h4>Salary Range</h4>
						                <div class="content">${jobData[3]} - ${jobData[4]}</div>
						            </div>
						            <div class="row job-description">
						                <div class="content ">${jobData[5]}</div>
						            </div>
						        </div>
							</div>
						</div>`,
			});
			jobAbout.open();
            ps_notif = new PerfectScrollbar('#display_job');
            
            $(".company").on('click',function(){
				business_data = $(this).data('business');
				business_data = JSON.parse(business.get(business_data))[0];
				logo  = ((typeof business_data[1] == 'object') || (business_data[1] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${business_data[1]}`;
				companyAbout = app.popover.create({
					targetEl: '.company',
					content: `<div class="popover" id='display_company'>
								<div class='panel-company'>
							        <div id='display_business' style='height:${h}px !important;'>
							            <div class="row business-info">
							                <div class="company-background">
				                    			<a class="popover-close close button button-large button-fill button-round bg-color-white in-field-btn ripple-color-green"><i class='material-icons text-color-gray'>close</i></a>
							                    <img src="${logo}" width='100%'>                    
							                </div>
							                <div class="company">
							                    <h3 class="name">${business_data[0]}</h3>
							                    <h6 class="address">${business_data[2]}</h6>
							                    <h6 class="email">Email: ${business_data[3]} | Phone: ${business_data[4]}</h6>
							                </div>
							            </div>
							            <div class="row company-description">
							                <div class="content">${business_data[5]}</div>
							            </div>
							        </div>
								</div>
							</div>`,
				});
				companyAbout.open();
	            ps_business = new PerfectScrollbar('#display_business');
			});
		});
	}
}

messages ={
	ini:function(){
		let id =  account.id();
		let data = JSON.parse(this.get(id));
		console.log(this.get(id));
		this.display(data);
	},
	get:function(data){
		var ajax = system.ajax(system.host('get-messages'),data);
		return ajax.responseText;
	},
	display:function(data){
		console.log(data);
		let	picture = "", id="", convo ="";
		$.each(data,function(i,v){
			picture  = ((typeof v[0][2] == 'object') || (v[0][2] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${v[0][2]}`;
			$('#list_messages ul').prepend(`
				<a class="item-link item-content" href="#" data-cmd="job-info" data-node="${v[2]}">
					<div class="item-media"><img src="${picture}" width="44"/></div>
					<div class="item-inner">
						<div class="item-title-row">
							<div class="item-title">
								<strong>${v[0][1]}</strong>
							</div>
						</div>
						<div class="item-subtitle">
							${v[1]}
						</div>
					</div>
				</a>`);

		})			
			$(`a[data-cmd='job-info']`).on('click',function(){
				convo = $(this).data('node');
				localStorage.setItem('convo',convo);
				view.router.navigate('/message/');
			});
		$(`#list_messages img`).on('error',function(){
			$(this).attr({'src':`${server}/assets/images/logo/icon.png`});
		});
	}
}
convo ={
	ini:function(){
		let id = localStorage.getItem('convo');
		this.display(id);
		this.send(id);
	},
	get:function(id){
		var ajax = system.ajax(system.host('get-messageConvo'),id);
		return ajax.responseText;
	},
	send:function(id){
		let data = JSON.parse(convo.get(id));
		let messages = app.messages.create({el: '.messages'});
	    let messagebar = app.messagebar.create({el: '.messagebar'});
	    let responseInProgress = false;
		$$('.demo-send-message-link').on('click', function () {			
	      let text = messagebar.getValue().replace(/\n/g, '<br>').trim();
	      if (responseInProgress) return;
	       let user = account.get()[0], tempPicture = "";
        	let picture = ((new RegExp('facebook|googleusercontent','i')).test(data[19]))? data[19] : ((typeof data[19] == 'object') || (data[19] == ""))? tempPicture : `${server}/assets/images/logo/${data[19]}`;
            if(!text.length){
                    system.notification("Kareer","Message box is empty.");
            }
            else{
            	var ajax = system.ajax(system.host('do-message'),[account.id(),data[0][5],data[0][4],text,'application']);
                ajax.done(function(ajax){
                	console.log(ajax);
                    if(ajax == 1){
                        messagebar.clear();
					    messagebar.focus();
					    messages.addMessage({
					       text: text
					    });
                        system.notification("Kareer","Message sent.");
                            // $('#messageBox').scrollTop($('#messageBox').prop("scrollHeight"));/*this will stick the scroll to bottom*/
                    }
                    else{
                        system.notification("Kareer","Message not sent.");
                    }
                });
            }
	    });
	},
	display:function(id){
		let data = JSON.parse(convo.get(id)), business="", sender="";
		// $('message-title').html(`Application for ${data[0][6]}`);
        let realtime = setTimeout(function(){
			$$('#messageBox .messages').html('');
			console.log('asda');
			convo.display(id);
		},50000);
		$.each(data,function(i,v){
			sender = (v[4] == account.id())?'sent':'received';
            business = ((typeof v[0] == 'object') || v[0] == "") ? 'icon.png' : v[0];
            // $('#messageBox .messages').prepend(`
            	<div class="message message-${sender}">
            		<div class="message-content">
	                <div class="message-name">${v[1]}</div>
	                    <div class="message-bubble">
	                        <div class="message-text">${v[2]}</div>
	                    </div>
	                </div>
	            </div>
            `);
        });
		$('#message-info .back').on('click',function(){clearTimeout(realtime);}); /*off realtime*/
        // $('#messages ul').scrollTop($('#messages ul').prop("scrollHeight")); /*this will stick the scroll to bottom*/
	}
}

/*notifications, application in the tbl_logs with status of 1 = unread */
notifications ={
	ini:function(){
		let id =  account.id();
		let data = this.get(id);
		this.display(JSON.parse(data));
	},
	get:function(data){
		var ajax = system.ajax(system.host('get-notifications'),data);
		return ajax.responseText;
	},
	display:function(data){
		let	picture = "", notifName ="", notifValue = "", notifProp ="", status="",tag="",ps_notif="",badge ="";
		$.each(data,function(i,v){
			// console.log(v);
			tag = (v[3] == 'application')?`updated your ${v[3]} status`:`set a ${v[3]}`
			status = (v[6] == 1)?['unread','bg-color-gray']:['read','bg-color-white']; /*color indicator if read or unread*/
			picture  = ((typeof v[5] == 'object') || (v[5] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${v[5]}`;
			$('#list_notifications ul').prepend(`
				<a class="item-link ${status[1]} item-content" href="#" data-cmd="job-info" data-value="${v[1]}" data-prop = '${v[7]}' data-node="${v[0]}" data-name ="${status[0]}">
					<div class="item-media"><img src="${picture}" width="44"/></div>
					<div class="item-inner">
						<div class="item-title-row">
							<div class="item-title">
								<strong>${v[4]}</strong> ${tag}
							</div>
						</div>
						<small>${v[2]}</small>
					</div>
				</a>`);

		})			
		$(`a[data-cmd='job-info']`).on('click',function(){
			notifNode = $(this).data('node');
			notifValue = $(this).data('value');
			notifProp = $(this).data('prop');
			notifications.action($(this).data('node')); /*read function*/
			let notifInfo = JSON.parse(notification.get(notifNode,notifValue,notifProp))[0], logo = "",random = "", status ="";
			logo  = ((typeof notifInfo[4] == 'object') || (notifInfo[4] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${notifInfo[4]}`;
			notifAbout = app.popover.create({
				targetEl: '.company',
				content: `<div class="popover" id='display_job'>
							<div class='panel-company'>
						        <div style='height:${h}px !important;'>
						            <div class="row business-info">
						                <div class="company-background">
						                    <a class="popover-close close button button-large button-fill button-round bg-color-white in-field-btn ripple-color-green"><i class='material-icons text-color-gray'>close</i></a>
						                    <img src="${logo}" width='100%'>                    
						                </div>
						                <div class="company popover-close" data-business='${notifInfo[7]}'>
						                    <h2 class="">${notifInfo[3]}</h2>
						                    <h4 class="">${notifInfo[5]}</h4>
						                </div>
						            </div>
						            <div class="row job-title">
						                <h1>${notifInfo[2]} <small class="text-color-gray">${notifInfo[6]}</small></h1>
						            </div>
						        </div>
							</div>
						</div>`,
			});
			notifAbout.open();
            ps_job = new PerfectScrollbar('#display_job');

            $(".company").on('click',function(){
				business_data = $(this).data('business');
				business_data = JSON.parse(business.get(business_data))[0];
				logo  = ((typeof business_data[1] == 'object') || (business_data[1] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${business_data[1]}`;
				companyAbout = app.popover.create({
					targetEl: '.company',
					content: `<div class="popover" id='display_company'>
								<div class='panel-company'>
							        <div id='display_business' style='height:${h}px !important;'>
							            <div class="row business-info">
							                <div class="company-background">
				                    			<a class="popover-close close button button-large button-fill button-round bg-color-white in-field-btn ripple-color-green"><i class='material-icons text-color-gray'>close</i></a>
							                    <img src="${logo}" width='100%'>                    
							                </div>
							                <div class="company">
							                    <h3 class="name">${business_data[0]}</h3>
							                    <h6 class="address">${business_data[2]}</h6>
							                    <h6 class="email">Email: ${business_data[3]} | Phone: ${business_data[4]}</h6>
							                </div>
							            </div>
							            <div class="row company-description">
							                <div class="content">${business_data[5]}</div>
							            </div>
							        </div>
								</div>
							</div>`,
				});
				companyAbout.open();
	            ps_business = new PerfectScrollbar('#display_business');
			});
		});
		$(`#list_notifications img`).on('error',function(){
			$(this).attr({'src':`${server}/assets/images/logo/icon.png`});
		});
        ps_notif = new PerfectScrollbar('#list_notifications .content');
        
        $('#notification-info .back').on('click', function(){
        	$.each(JSON.parse(notifications.get(account.id())),function(i,v){
			if(v[6] == 1){
				badge+=v[6];
			}
			});
			console.log(badge.length);
			$('span.badge.notif').html((badge.length > 0)?badge.length:'0');
        });

	},
	action:function(id){ /*change application log status into read and update the number of notifications*/
		var ajax = system.ajax(system.host('do-action'),[id,'notification']);
        ajax.done(function(ajax){
        	console.log((ajax == 1)?'read':'unread');
        	$(`a[data-node='${id}']`).removeClass('bg-color-grey');
        	$(`a[data-node='${id}']`).addClass('bg-color-white');
        	// account.ini();
        });
	}
}
notification ={
	get:function(log,id,job){
		var ajax = system.ajax(system.host('get-notificationInfo'),[log,id,job]);
		return ajax.responseText;
	}

}
/**/

search = {
	ini:function(){
	}
}

business = {
	ini:function(){
		let id = localStorage.getItem('business');
		let business_data = JSON.parse(this.get(id))[0], managers_data = JSON.parse(this.getManagers(id));
		this.display([business_data, managers_data]);
	},
	get:function(id){
		var ajax = system.ajax(system.host('get-business'),id);
		return ajax.responseText;
	},
	getManagers:function(id){
		var ajax = system.ajax(system.host('get-businessManagers'),id);
		return ajax.responseText;
	},
	display:function(data){
		console.log(data);
		let	picture = "", tempPicture = `${server}/assets/images/logo/icon.png`, logo  = ((typeof data[1] == 'object') || (data[1] == ""))? `${server}/assets/images/logo/icon.png` : `${server}/assets/images/logo/${data[1]}`;

		$("#display_business .business-info img").attr({'src':logo});
		$("#display_business .business-info .company .name").html(data[0]);
		$("#display_business .business-info .company .address").html(`<strong>Address:</strong> ${data[2]}`);
		$("#display_business .business-info .company .email").html(`<strong>Email:</strong> ${data[3]}`);
		$("#display_business .business-info .company .phone").html(`<strong>Phone:</strong> ${data[4]}`);
		$("#display_business .company-description .content").html(data[5]);
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
				        localStorage.setItem('callback','kareer-oauth');
				        localStorage.setItem('account_id',data[2]['id']);
						localStorage.setItem('account',JSON.stringify(data[2]));
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
		
		var from = new Date((new Date()).getFullYear()-18, 1, 1);
		var calendarModal = app.calendar.create({
			inputEl: '#field_dob',
			openIn: 'customModal',
			dateFormat: 'MM dd, yyyy',
			footer: true,
			firstDay:0,
		    disabled: {from: from}
		});

		$("#form_signup").validate({
			rules: {
				field_firstname: {required: true, maxlength: 50},
				field_lastname: {required: true, maxlength: 50},
				field_dob: {required: true, maxlength: 100},
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
				let _form = $(form).serializeArray(), data = "";
				form = [form[0].value, form[1].value,form[3].value, form[4].value, form[2].value, "", "", ""];
				data = system.ajax(system.host('do-signUp'),form);
				data.done(function(data){
					if(data != 0){
						data = JSON.parse(data);
				        localStorage.setItem('account_id',data['id']);
						localStorage.setItem('callback','kareer-oauth');
						localStorage.setItem('account',data);
						system.notification("Kareer","Success. You are now officially registered.");
						view.router.navigate('/signin/');
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
            if(data == 1){
                system.notification("Kareer","Success. You are now officially registered.");
                view.router.navigate('/signin/');                        
            }
            else if(data == 2){
                view.router.navigate('/signin/');                        
                system.notification("Kareer","You are already signed in. Try signing in using your email.");
            }
            else{
                system.notification("Kareer","Sign up failed.",false,3000,true,false,false);
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
	        	console.log(data);
	            data = JSON.parse(data);
	            if(data[1] == 'applicant'){
	                view.router.navigate('/account/');                        
	            }
	            else{
	                system.notification("Kareer","Sign in failed.");
	            }
	        });
		},500);
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