
page.MyPage = (function(){
	
	return function(){

		if(!comm.initPage()){
	    	return;
	    }
		
		var datas = comm.I;
		
	    comm.initPage();

	    template.RenderOne({
	        target: "#body",
	        tagName: "div",
	        className: "my-page",
	        id: "bodyMyPage",
	        position: "new",
	        template: comm.getHtml("contents/my-page.html"),
	        data: {},
	        events: {
	            "click .my-page": function () {
	                alert("board!");
	            }
	        }
	    });
	};
})();