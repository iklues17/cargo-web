adminPage.cargoDetailSection = (function() {

	var bookingDetail = {};
	var cargoDetail = {};
	
	var getBookingDetail = function(bookingId){
	
		$.ajax({
			url: "http://localhost:9999/booking/bookings/"+bookingId,
			method: "GET",
			dataType: "json",
			contentType: "application/json",
			success: function(data, textStatus, jqXHR){
				bookingDetail = data;
//				cargoDetailView.init();
			},
			complete : function(text, xhr){
			}
		});
		console.log("chage ds = " + bookingDetail);
	};
	
	var getCargoDetail = function(trackingId){
	
		$.ajax({
			url: "http://localhost:9999/tracker/cargos/"+trackingId,
			method: "GET",
			dataType: "json",
			contentType: "application/json",
			success: function(data, textStatus, jqXHR){
				cargoDetail = data;
				cargoDetailView.init();
			},
			complete : function(text, xhr){
			}
		});
		console.log("chage ds = " + cargoDetail);
	};
	
	var cargoDetailView = {
		_cargoDetail: {},
		
		ID: {
			entry: "#tblCargoDetail",
			divRouted: "#divRouted",
			divMisrouted: "#divMisrouted",
			divNotRouted: "#divNotRouted"
		},
		
		init: function(){
			_cargoDetail = cargoDetail;
			this.controlViewDiv();
			this.printCargo();
		},
		
		controlViewDiv: function(){
			
//			var isRouted = _cargoDetail.cargo.routed;
//			$('[aria-cargo-routed]').attr('aria-cargo-routed', isRouted);
//			$('[aria-cargo-misrouted]').attr('aria-cargo-misrouted', _cargoDetail.cargo.misrouted);
//			$('[aria-cargo-not-routed]').attr('aria-cargo-not-routed', (isRouted == false));
			var isRouted = _cargoDetail.routed;
			$('[aria-cargo-routed]').attr('aria-cargo-routed', isRouted);
			$('[aria-cargo-misrouted]').attr('aria-cargo-misrouted', _cargoDetail.misrouted);
			$('[aria-cargo-not-routed]').attr('aria-cargo-not-routed', (isRouted == false));
		},
		
		printCargo: function(){
			var _this = this;
			var cargoDetail = _cargoDetail;
			
			// entry
			$(this.ID.entry).before('<span class="success label">Details for cargo '+cargoDetail.trackingId+'</span>');
			$(this.ID.entry).append('<tbody>'
				+ '<tr>'
				+  '<td>Origin</td>'
				+  '<td>'+cargoDetail.origin+'</td>'
				+ '</tr>'
				+ '<tr>'
				+  '<td>Destination</td>'
				+  '<td>'+cargoDetail.finalDestination+'</td>'
				+ '</tr>'
				+ '<tr>'
				+  '<td></td>'
	            +  '<td><a href="'+window.location.hash+'/change-destination">Change destination</a></td>'
				+ '</tr>'
				+ '<tr>'
				+  '<td>Arrival deadline</td>'
				+  '<td>'+cargoDetail.arrivalDeadline+'</td>'
				+ '</tr>'
				+'</tbody>');
			
			$(this.ID.divRouted).append('<table border="1">'
				+'<thead>'
				+ '<tr>'
				+  '<th>Voyage number</th>'
				+  '<th>Load Location</th>'
				+  '<th class="show-for-medium-up">Time</th>'
				+  '<th>Unload Location</th>'
				+  '<th class="show-for-medium-up">Time</th>'
				+ '</tr>'
				+'</thead>'
				+'<tbody></tbody></table>');
			
			// itinerary
			var target = $(this.ID.divRouted + '> table > tbody');
			$.each(cargoDetail.legs, function(i){
				target.append('<tr>'
					+ '<td>'+this.voyageNumber+'</td>'
					+ '<td>'+this.from+'</td>'
					+ '<td class="show-for-medium-up">'+this.loadTime+'</td>'
					+ '<td>'+this.to+'</td>'
					+ '<td class="show-for-medium-up">'+this.unloadTime+'</td>'
					+'</tr>');
			});
			
			// mis routed
			$(this.ID.divMisrouted).find('a').attr('href', window.location.hash+'/select-itinerary');
			// not routed
			$(this.ID.divNotRouted).find('a').attr('href', window.location.hash+'/select-itinerary');
		}
	};
	
	
	return function(status, id){

		if(!comm.initPage()){
	    	return;
	    }
	    
	    template.RenderOne({
	        target: "#body",
	        tagName: "div",
	        className: "about",
	        id: "bodyAbout",
	        position: "new",
	        template: comm.getHtml("contents/cargo-detail.html"),
	        data: undefined,
	        events: {
	        },

	        afterRender: function() {
	        	if(status === "not-accepted"){
	        		getBookingDetail(id);
	        	}else{
	        		getCargoDetail(id);
	        	}
	        } 
	    });
	};
})();