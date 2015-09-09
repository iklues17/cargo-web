page.ChangeDestination = (function(){
	
	var ENV = {
		BOOKING_ID: "",
		ID_FORM: "#frmChangeDestination",
		ID_BTN_SUBMIT: "#btnChangeDestination",
		ID_BTN_CANCEL: "#btnBack"
	};
	
	var booking = {};
	
	var getCargoDetail = function(bookingId){

		console.log("API Call(bookingId:"+bookingId+") GET /booking/bookings/{bookingId}");
		$.ajax({
			async: false,
			url: comm.server.url+ "/booking/bookings/" + bookingId,
			method: "GET",
			dataType: "json",
			contentType: "application/json",
			success: function(data, textStatus, jqXHR){
				booking = data;
			},
			complete : function(text, xhr){
			}
		});
		
	};
	var formView = {
		
		init: function(){
			var that = this;
			$(ENV.ID_BTN_SUBMIT).on('click', function(e){
				that.doChangeDestination(that.getFormData());
			});
			$(ENV.ID_BTN_CANCEL).on('click', function(e){
				history.back();
			});
			
		},
		
		getFormData: function(){
			var formObj = comm.queryStringToJson($(ENV.ID_FORM).serialize());
			formObj.bookingId = ENV.BOOKING_ID;
			return formObj;
		},
		
		doChangeDestination : function(data){
			console.log("API Call(bookingId:"+data.bookingId+") PUT /booking/bookings/{bookingId}/change-destination");
			
			$.ajax({
				async: false,
				url: comm.server.url + "/booking/bookings/" + data.bookingId + "/change-destination",
				method: "PUT",
				data: JSON.stringify(data),
				dataType: "text",
				contentType: "application/json",
				success: function(data, textStatus, jqXHR){
					window.location.href = "";
				},
				error:function( jqXHR,  textStatus,  errorThrown){
					comm.openModalForErrorMsg(textStatus, "Contact us");
					console.log(textStatus);
				},
				complete : function(text, xhr){
				}
			});
		}
			
	};
	
	var init = function(bookingId){
		ENV.BOOKING_ID = bookingId;
		getCargoDetail(bookingId);
	}

	return function(bookingId){
		
		if(!comm.initPage()){
	    	return;
	    }
	    
		init(bookingId);
		
	    template.RenderOne({
	        target: "#body",
	        tagName: "div",
	        className: "chage-destination",
	        id: "bodyChangeDestination",
	        position: "new",
	        template: comm.getHtml("contents/change-destination.html"),
	        data: booking,
	        events: {
	        },

	        afterRender: function() { 
	    		formView.init();
	        	comm.appendSelectLocations($('#locations'));
	        } 
	    });

	};
})();