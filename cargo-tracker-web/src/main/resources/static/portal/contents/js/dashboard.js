"use strict";
		
page.Dashboard = (function(){
	var bookedCargos = [];
	
	var getTrackings = {
		init : function(){
	//		$.ajax({
	//			url: "http://localhost:9999/tracker/cargos",
	//			method: "GET",
	//			//data: JSON.stringify(data),
	//			dataType: "json",
	//			contentType: "application/json",
	//			success: function(data, textStatus, jqXHR){
	//				bookedCargos = data;
	//				routedView.init();
	//				claimedView.init();
	//				notRoutedView.init();
	//			},
	//			complete : function(text, xhr){
	//			}
	//		});
			bookedCargos = [
	             {
	             	bookingId: '1',
	             	origin: 'BUSAN',
	             	destination: 'SEOUL',
	                arrDate: '2015-09-09',
	                comodity: 'Phone',
	                quantity: 3,
	                status: 'Not Accepted'
	             },
	             {
	             	bookingId: '2',
	             	origin: 'SUWON',
	             	destination: 'SEOUL',
	                arrDate: '2015-09-09',
	                comodity: 'Phone',
	                quantity: 3,
	                status: 'Not Accepted'
	             }
	         ]; // RESTful api callback data example
		}
	};
	
	var routedView = {
		
		ID: {
			grid: "#gridRouted"
		},
		
		init: function(){
			getTrackings.init();
			page.bookedCargosGrid(bookedCargos);
		}
	};
	
	return function(){

	    comm.initPage();

	    template.RenderOne({
	        target: "#body",
	        tagName: "div",
	        className: "dashboard",
	        id: "bodyDashboard",
	        position: "new",
	        template: comm.getHtml("contents/dashboard.html"),
	        data: {},
	        events: {
	            "click .dashboard": function () {
	                alert("dashboard!");
	            }
	        },

	        afterRender: function(Dashboard) { 
	            routedView.init();
	        } 
	    });

	};
})();