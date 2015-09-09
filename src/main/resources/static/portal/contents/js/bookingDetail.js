page.bookingDetailSection = function (bookingId) {

	if(!comm.initPage()){
    	return;
    }
	
	var env = {
		targetId: "#divBookingDetail",
		tagName: "div",
		className: "booking-detail",
		id: "sectionBookingDetail",
		html: "contents/booking-detail.html"
	};

	//Dashboard에 종속된 화면이므로 대쉬보드 화면이 떠잇는지 확인 후 없으면 로딩
	if($(env.targetId).length === 0){
		page.Dashboard();
	}
	var datas;
	$.ajax({
		async: false,
		url: comm.server.url + "/booking/bookings/"+bookingId,
		method: "GET",
		dataType: "json",
		contentType: "application/json",
		success: function(data, textStatus, jqXHR){
			datas = data;
		},
		complete : function(text, xhr){
		}
	});
	
    datas.entryForm = [
        {value: datas.bookingId, viewonly: true, displayName: "Booking ID", name:"bookingId"},
        {value: datas.origin, viewonly: true, displayName: "Origin", name:"origin"},
        {value: datas.destination, viewonly: true, displayName: "Destination", name:"destination"},
        {value: datas.status, viewonly: true, displayName: "Booking Status", name:"status"},
        {value: datas.trackingId, viewonly: true, displayName: "Tracking ID", name:"trackingId"}
	];
    
    template.RenderOne({
        target: env.targetId,
        tagName: env.tagName,
        className: env.className,
        id: env.id,
        position: "new",
        template: comm.getHtml(env.html),
        data: datas,
        events: {
            "mouseover tbody>tr": function (e) {
            	$(e.currentTarget).addClass('recode-active');
            },
		    "mouseout tbody>tr": function (e) {
		    	$(e.currentTarget).removeClass('recode-active');
		    },
		    "click tbody>tr": function (e) {
		    	$(e.currentTarget).parent().find('.recode-selected').removeClass('recode-selected');
		    	$(e.currentTarget).addClass('recode-selected');
		    }
        }
    });
};