"use strict";

page.MenuTop = (function () {
	
	return function(){
		
		var datas = {isLogedin : comm.isLogedin};
		
	    template.RenderOne({
	        target: ".top-bar-section",
	        tagName: "div",
	        className: "menu-top",
	        id: "menuTop",
	        position: "new",
	        template: comm.getHtml("menu-top.html"),
	        data: datas,
	        events: {
	        }
	    });
	};
})();