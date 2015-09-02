"use strict";

(function() {

    var root = this;
    var comm = root.comm = {};

}).call(this);


$(document).foundation({
	offcanvas : {
		// Sets method in which offcanvas opens.
		// [ move | overlap_single | overlap ]
		open_method: 'overlap', 
		// Should the menu close when a menu link is clicked?
		// [ true | false ]
		close_on_click : false
	}
});

comm.getHtml = function (path) {

    var getFile = $.ajax({
        url: path,
        async: false,
        success: function (data) {
            return data;
        }
    });

    return getFile.responseText;
};

comm.initPage = function () {

    $("#content").html('');

    $("#header > .icon-bar > .item").removeClass('active');

    $(".top-bar-section > ul > li").removeClass('active');
    
    if (location.hash == '#booking') {
    	$(".top-bar-section > ul > li").eq(1).addClass('active');
    } else if (location.hash == '#track') {
    	$(".top-bar-section > ul > li").eq(2).addClass('active');
    } else if (location.hash == "#my-page") {
    	$(".top-bar-section > ul > li").eq(3).addClass('active');
    } else if (location.hash == '#about') {
    	$(".top-bar-section > ul > li").eq(4).addClass('active');
    } else {
    	$(".top-bar-section > ul > li").eq(0).addClass('active');
    }

};

comm.login = function(){
	var $signInMenu = $('[data-login="false"]');
	$signInMenu.find('label').text('Logout');
	page.signUpPage();
};

comm.queryStringToJson = function(queryString){
	return (queryString || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
};

comm.openModalForErrorMsg = function(errorMsg, followup){
	$('body').append('<div id="myModal" class="reveal-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">'
			+ '<h2 id="modalTitle">Sorry. Your request is failed.</h2>'
			+  '<p class="lead">'+errorMsg+'</p>'
			+  '<p>'+followup+'</p>'
			+  '<a class="close-reveal-modal" aria-label="Close">&#215;</a>'
			+ '</div>');
	$('#myModal').foundation('reveal', 'open');
};



comm.getLocations = function(){
	return [
		{"name": "Chicago (USCHI)"	 , "unLocode": "USCHI"},
		{"name": "Dallas (USDAL)"	 , "unLocode": "USDAL"},
		{"name": "Guttenburg (SEGOT)", "unLocode": "SEGOT"},
		{"name": "Hamburg (DEHAM)"	 , "unLocode": "DEHAM"},
		{"name": "Hangzhou (CNHGH)"	 , "unLocode": "CNHGH"},
		{"name": "Helsinki (FIHEL)"	 , "unLocode": "FIHEL"},
		{"name": "Hong Kong (CNHKG)" , "unLocode": "CNHKG"},
		{"name": "Melbourne (AUMEL)" , "unLocode": "AUMEL"},
		{"name": "New York (USNYC)"	 , "unLocode": "USNYC"},
		{"name": "Rotterdam (NLRTM)" , "unLocode": "NLRTM"},
		{"name": "Shanghai (CNSHA)"	 , "unLocode": "CNSHA"},
		{"name": "Stockholm (SESTO)" , "unLocode": "SESTO"},
		{"name": "Tokyo (JNTKO)"	 , "unLocode": "JNTKO"}
	];
}

comm.appendSelectLocations = function($target){
	$.each(comm.getLocations(), function(i){
		$target.append('<option value="'+this.unLocode+'">'+this.name+'</option>');
	});
}

comm.queryStringToJson = function(queryString){
	return (queryString || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
}


Handlebars.registerHelper('table-head', function () {
    var th = '<th style="width:'+this.width+'" class="'+(this.hidden == true ? 'hide' : '')+'">'+this.display+'</th>';
    return th;
});

//Handlebars.registerHelper('bookingId', function (arg) {
//	debugger;
//	return '<a href="#booking-detail">'+this.bookingId+'</a>';
//	return options.fn(this);
//    var th = '<th style="width:'+this.width+'" class="'+(this.hidden == true ? 'hide' : '')+'">'+this.display+'</th>';
//    return fn;
//});