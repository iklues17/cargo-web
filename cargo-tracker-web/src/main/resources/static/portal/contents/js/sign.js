
page.SignIn = (function(){
	
	var login = function(){
		//ajax
		comm.I = {
			id: "19238464",
			emailAddress: "aoa.seolhyun@samsung.com",
			password: "1234",
			firstName: "Seolhyun",
			lastName: "Kim",
			company: {
				id: "3485",
				name: "Samsung SDS"
			},
			role: "Manager"
		};
		comm.isLogedin = true;
		// Menu bar 다시 로딩
		page.MenuTop();
		// Main 화면으로 전환
		window.location.hash = "";
	}
	
	return function(){
		
		if(!comm.initPage()){
	    	return;
	    }
	
	    template.RenderOne({
	        target: "#body",
	        tagName: "div",
	        className: "sign-in",
	        id: "bodySignIn",
	        position: "new",
	        template: comm.getHtml("contents/sign-in.html"),
	        data: undefined,
	        events: {
	            "click #btnCreateAccount": function() {
	            	page.signUpPage();
	            },
	            "click #btnSignIn": function(){
	            	login();
	            }
	        }
	    });
	};
})();

page.SignOut = (function(){
	
	var logout = function(){
		//ajax
		comm.I = {};
		comm.isLogedin = false;
		// Menu bar 다시 로딩
		page.MenuTop();
		// 로그인 화면으로 전환
		window.location.hash = "#sign-in";
	}
	
	return function(){
		
		if(!comm.initPage()){
	    	return;
	    }
	
	    template.RenderOne({
	        target: "#body",
	        tagName: "div",
	        className: "sign-out",
	        id: "bodySignOut",
	        position: "new",
	        template: comm.getHtml("contents/sign-out.html"),
	        data: undefined,
	        events: {
	            "click #btnSignOut": function(){
	            	logout();
	            }
	        }
	    });
	};
})();

page.SignUp = (function(){
	
	return function(){
		
		if(!comm.initPage()){
	    	return;
	    }
	
	    template.RenderOne({
	        target: "#body",
	        tagName: "div",
	        className: "sign-up",
	        id: "bodySignUp",
	        position: "new",
	        template: comm.getHtml("contents/sign-up.html"),
	        data: undefined,
	        events: {
	            "click #btnSignUp": function() {
	            	comm.doNetwork({
	            		url: 'http://localhost:8081/user',
	            		method: 'POST',
	            		contentType: 'application/json',
	            		data: JSON.stringify(comm.queryStringToJson($('#frmSignUp').serialize())),
	            		error: function( jqXHR, textStatus, errorThrown ){
	            			if(jqXHR.status == 409){
	            				comm.openModalForErrorMsg("409 "+errorThrown, "Email is already registered.");
	            			}else{
	            				comm.openModalForErrorMsg(errorThrown, "Please contact adminitrator.");
	            			}
	            		},
	            		complete: function(jqXHR, textStatus){
	            			if(jqXHR.status == 201){
	                        	page.successPage({});
	            			}
	            		}
	            	});
	            },
			    "click #btnBack": function() {
			    	window.history.back();
			    }
	        }
	    });
	};
})();
