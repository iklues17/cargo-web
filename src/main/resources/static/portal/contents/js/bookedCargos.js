"use strict";
		
page.bookedCargosGrid = function (datas) {
	
    if(!comm.initPage()){
    	return;
    }

	var env = {
		targetId: "#divBookedCargos",
		tagName: "div",
		className: "booked-cargos",
		id: "gridBookedCargos",
		html: "contents/booked-cargos.html"
	};
	
    var datas = {

        tableheaders : [
            {display:'Booking ID',		hidden:false, width: '13%'},
            {display:'Origin',			hidden:false, width: '18%'},
            {display:'Destination',		hidden:false, width: '18%'},
            {display:'Deadline',		hidden:false, width: '15%'},
            {display:'Commodity',		hidden:false, width: '15%'},
            {display:'Q.T',				hidden:false, width: '8%'},
            {display:'Booking Status',	hidden:false, width: '10%'}
        ],
        tabledatas: datas,
        link: "*.html"
    };


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
		    	window.location.hash="detail/"+$(e.currentTarget).attr('id');
//		    	page.bookingDetailSection($(e.currentTarget).attr('id'));
		    }
        }
    });
};