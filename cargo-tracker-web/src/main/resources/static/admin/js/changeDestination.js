var ChangeDestination = (function() {
	var cargoDetails = {};
	
	var getCargoDetail = function(){
		var trackingId = getParameterByName('trackingId');
		
		$.ajax({
			url: "http://localhost:9999/tracker/cargos/" + trackingId,
			method: "GET",
			dataType: "json",
			contentType: "application/json",
			success: function(data, textStatus, jqXHR){
				cargoDetails = data;
				gridView.init();
				formView.init();
			},
			complete : function(text, xhr){
			}
		});
	};
	
	var gridView = {
		_cargoDetail: {},
		
		ID: {
			FROM: "#frmChangeDestination",
			SEL_LOCATIONS: "#locations",
			trackingId: ""
		},
		
		init: function(){
			_cargoDetail = cargoDetails;
			this.makeGrid();
		},
		
		makeGrid: function(){
			var cargoDetail = _cargoDetail;
			this.ID.trackingId = cargoDetail.trackingId;
			
			$(this.ID.FROM).append('<span class="label">Change destination for cargo '+cargoDetail.trackingId+'</span>');
			$(this.ID.FROM).append('<table>'
				+ '<tbody>'
				+  '<tr>'
				+   '<td>Current destination</td>'
				+   '<td>'+cargoDetail.finalDestination+'</td>'
				+  '</tr>'
				+  '<tr>'
				+   '<td>New destination</td>'
				+   '<td>'
				+    '<select id="locations" name="destinationUnlocode"></select>'
				+   '</td>'
				+  '</tr>'
				+  '</tbody>'
				+  '<tfoot>'
				+  '<tr>'
				+   '<td></td>'
				+   '<td><input type="submit" id="btnChangeDestination" class="button small" style="margin-bottom:0px;" value="Change destination"/></td>'
				+  '</tr>'
				+  '</tfoot>'
				+'</table>');
			
			appendSelectLocations($(this.ID.SEL_LOCATIONS));
		},
		
		getNewDestination: function(){
			return {"trackingId": this.ID.trackingId, "destinationUnlocode": $(this.ID.SEL_LOCATIONS).val()};
		}
	};
	
	var formView = {
		_gridView: gridView,
			
		ID: {
			FORM: "#frmChangeDestination",
			BTN_SUBMIT: "#btnChangeDestination"
		},
		
		init: function(){
			_this = this;
		
			/* for Form submit (Content-Type: application/application/x-www-form-urlencoded) */
//			$(this.ID.FORM).attr("method", "POST");
//			$(this.ID.FORM).attr("action", "/trackings/"+_this._gridView.getNewDestination().trackingId+"/change-destination");
			$(this.ID.FORM).submit(function(e){
				/* for AjaxCall (Content-Type: application/json) */
				e.preventDefault();
				_this.doChangeDestination(_this._gridView.getNewDestination());
			});
			
		},
		
		doChangeDestination : function(data){
			$.ajax({
				url: "http://localhost:9999/tracker/cargos/"+data.trackingId+"/change-destination",
				method: "POST",
				data: JSON.stringify(data),
				dataType: "json",
				contentType: "application/json",
				error:function( jqXHR,  textStatus,  errorThrown){
					console.log(textStatus);
				},
				complete : function(text, xhr){
					location.href = "/admin/cargoDetail.html?trackingId="+data.trackingId;
				}
			});
		}
			
	};
	
	return {
		init : function() {
			getCargoDetail();
//			gridView.init();
//			formView.init();
		}
	};
})();


$(document).foundation();
		
$(document).ready(function(){
	ChangeDestination.init();
});