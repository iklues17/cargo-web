
page.SignOut = (function(){
	
	var logout = function(){
		//ajax
		comm.I = {};
		comm.isLogedin = false;
		$.removeCookie('I');
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