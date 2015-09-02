var Resistration = (function() {
	
	var formView = {
			
		ID: {
			FORM: "#frmRegistration",
			SEL_ORIGIN: "#selLocOrigin",
			SEL_DESTIN: "#selLocDestination",
			BTN_SUBMIT: "#btnBooking"
		},
		
		init: function(){
			_this = this;
		
			$(this.ID.FORM).submit(function(e){
				e.preventDefault();
				_this.doRegister(queryStringToJson($(this).serialize()));
			});
			
			appendSelectLocations($(this.ID.SEL_ORIGIN));
			appendSelectLocations($(this.ID.SEL_DESTIN));
			
		},
		
		doRegister : function(data){
			$.ajax({
				url: "http://128.0.0.1:9999/tracker/cargos/registration",
				method: "POST",
				data: JSON.stringify(data),
				dataType: "text",
				contentType: "application/json",
				success: function(data, textStatus, jqXHR){
					location.href = "/admin/cargoDetail.html?trackingId="+data;
				},
				error: function(jqXHR, textStatus, errorThrown){
					console.log(jqXHR);
				},
				complete : function(text, xhr){
					
				}
			});
		}
	};
	
	var register = function(){
	};
	
	return {
		init : function() {
			formView.init();
		}
	};
})();


$(document).foundation();
		
$(document).ready(function(){
	Resistration.init();
});