var Dashbord = (function(){
	var trackingList = [];
	
	/* bookingServiceFacade.listAllCargos() */
	var getTrackings = function(){
		$.ajax({
			url: "http://localhost:9999/tracker/cargos",
			method: "GET",
			//data: JSON.stringify(data),
			dataType: "json",
			contentType: "application/json",
			success: function(data, textStatus, jqXHR){
				trackingList = data;
				routedView.init();
				claimedView.init();
				notRoutedView.init();
			},
			complete : function(text, xhr){
			}
		});
		//this.trackingList = data;
	};
	
	var routedView = {
		_dashboard: this,
		
		routedList: [],
		
		ID: {
			grid: "#gridRouted"
		},
		
		init: function(){
			var _this = this;
			$.each(trackingList, function(i){
//				if(this.routed == true && this.claimed == false){
				if(this.routed == true ){
					_this.routedList.push(this);
				}
			});
			this.makeGrid();
		},
		
		makeGrid: function(){
			var _this = this;
			var target = $(this.ID.grid);
			target.append('<table id="listRoutedTab">'
					+'<thead>'
					+ '<tr>'
					+  '<th width="140">Tracking ID</th>'
					+  '<th width="220">Origin</th>'
					+  '<th width="200">Destination</th>'
					+  '<th width="200" class="hide-for-small">Last Known Location</th>'
					+  '<th width="200" class="hide-for-small">Transport Status</th>'
					+  '<th width="240" class="hide-for-small">Deadline</th>'
					+ '</tr>'
					+'</thead>'
				    +'<tbody>'
					+'</tbody>'
					+'</table>');
			$.each(this.routedList, function(i){
				target.find('tbody').append('<tr id="'+this.trackingId+'">'
						+  '<td><a href="cargoDetail.html?trackingId='+this.trackingId+'">'+this.trackingId+'</a></td>'
						+  '<td>'+this.origin+'</td>'
						+  '<td>'+this.finalDestination+'</td>'
						+  '<td class="hide-for-small">'+this.lastKnownLocation+'</td>'
						+  '<td class="hide-for-small">'+this.transportStatus+'</td>'
						+  '<td class="hide-for-small">'+this.arrivalDeadline+'</td>'
						+ '</tr>');
			});
		}
	};
	
	var claimedView = {
		_dashboard: this,
		
		claimedList: [],
		
		ID: {
			grid: "#gridClaimed"
		},
		
		init: function(){
			_this = this;
			$.each(trackingList, function(i){
				if(this.claimed == true){
					_this.claimedList.push(this);
				}
			});
			this.makeGrid();
		},
		
		makeGrid: function(){
			var _this = this;
			var target = $(this.ID.grid);
			target.append('<table style="width:100%;">'
					+'<thead>'
					+ '<tr>'
					+  '<th>Tracking ID</th>'
					+  '<th>Origin</th>'
					+  '<th>Destination</th>'
					+ '</tr>'
					+'</thead>'
					+'<tbody>'
					+'</tbody>'
					+'</table>');
			$.each(this.claimedList, function(i){
				target.find('tbody').append('<tr id="'+this.trackingId+'">'
						+  '<td><a href="cargoDetail.html?trackingId='+this.trackingId+'">'+this.trackingId+'</a></td>'
						+  '<td>'+this.origin+'</td>'
						+  '<td>'+this.finalDestination+'</td>'
						+ '</tr>');
			});
		}
	};
	
	var notRoutedView = {
		_dashboard: this,
		
		notRoutedList: [],
		
		ID: {
			grid: "#gridNotRouted"
		},
		
		init: function(){
			_this = this;
			$.each(trackingList, function(i){
				if(this.routed == false){
					_this.notRoutedList.push(this);
				}
			});
			this.makeGrid();
		},
		
		makeGrid: function(){
			var _this = this;
			var target = $(this.ID.grid);
			target.append('<table style="width:100%;">'
					+'<thead>'
					+' <tr>'
					+'  <th>Tracking ID</th>'
					+'  <th>Origin</th>'
					+'  <th>Destination</th>'
					+' </tr>'
					+'</thead>'
					+'<tbody>'
					+'</tbody>'
					+'</table>');
			$.each(this.notRoutedList, function(i){
				target.find('tbody').append('<tr id="'+this.trackingId+'">'
						+  '<td><a href="cargoDetail.html?trackingId='+this.trackingId+'">'+this.trackingId+'</a></td>'
						+  '<td>'+this.origin+'</td>'
						+  '<td>'+this.finalDestination+'</td>'
						+ '</tr>');
			});
		}
	};
	
	return {
		init : function() {
			getTrackings();
			//routedView.init();
			//claimedView.init();
			//notRoutedView.init();
		}
	};
})();


$(document).foundation();
		
$(document).ready(function(){
	Dashbord.init();
});