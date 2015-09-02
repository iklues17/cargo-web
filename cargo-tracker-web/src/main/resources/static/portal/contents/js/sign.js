"use strict";

page.SignIn = function () {
    comm.initPage();

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
            	comm.login();
            }
        }
    });

};

page.SignUp = function () {
    comm.initPage();

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
