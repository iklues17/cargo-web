
page.Track = (function() {
	
	var ENV = {
		FORM_ID: "#formTracking",
		INPUT_TRACKING_ID : "#inputTrackingId",
		BTN_TRACK : "#btnTracking",
		DIV_TRACKING_DETAIL: "#divTracking"
	};
	
	var formView = {
		
		init: function(trackingId){
			_this = this;
		
			this.focus();
			$(ENV.INPUT_TRACKING_ID).on('keydown', function(e){
				if(e.keyCode == 13) {
					_this.getTrack();
				}
			});
			
			$(ENV.BTN_TRACK).on('click', function(e){
				_this.getTrack();
			});
			
			if(trackingId){
				$(ENV.INPUT_TRACKING_ID).val(trackingId);
				$(ENV.BTN_TRACK).trigger('click');
			}
		},
		
		focus: function(){
			$(ENV.INPUT_TRACKING_ID).trigger('focus');
		},
		
		getTrack: function(){
			trackingView.getTrackingById($(ENV.INPUT_TRACKING_ID).val());
		}	
	
	};
	
	var trackingView = {
		
		init: function(){
			$(ENV.DIV_TRACKING_DETAIL).hide();
		},
		
		getTrackingById: function(trackingId){
			var tracking = {};
			$.ajax({
				async: false,
				url: comm.server.url+"/tracker/cargos/"+trackingId+"/tracks",
				method: "GET",
				dataType: "json",
				contentType: "application/json",
				success: function(data, textStatus, jqXHR){
					//console.log(data);
					tracking = data;
				},
				error: function(jqXHR, textStatus, errorThrown){
		        	console.log("error : " + textStatus + ", " + errorThrown);
		        }
			});
			this.showTracking(tracking);
		},
		
		showTracking: function(tracking){
			$(ENV.DIV_TRACKING_DETAIL).show();
			
		    template.RenderOne({
		        target: "#divTracking",
		        tagName: "div",
		        className: "tracking-detail",
		        id: "divTrackingDetail",
		        position: "new",
		        template: comm.getHtml("contents/tracking-detail.html"),
		        data: tracking
		    });
		}
		
	};
	
	return  function(trackingId){
		
		if(!comm.initPage()){
	    	return;
	    }

	    template.RenderOne({
	        target: "#body",
	        tagName: "div",
	        className: "track",
	        id: "bodyTrack",
	        position: "new",
	        template: comm.getHtml("contents/track.html"),
	        data: undefined,
	        events: {
	        },

	        afterRender: function() { 
	        	trackingView.init();
				formView.init(trackingId);
	        }
	    });
	}
})();
