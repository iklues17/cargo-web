$(function(){

    var AppRouter = new (Backbone.Router.extend({
        routes: {
        	// Menu View
            "": "showDashboard",
            "booking": "showBooking",
            "track": "showTrack",
            "track/:trackingId": "showTrack",
            "about": "showAbout",
            // Right Menu view
            "my-page": "showMyPage",
            "my-page/:tabName": "showMyPage",
            "sign-in": "showSignIn",
            "sign-up": "showSignUp",
            "sign-out": "showSignOut",
            // Subview
            "detail/:bookingId": "showBookingDetail",
            "change-destination/:bookingId": "showChangeDestination",
            // Util View
            "success": "showSuccess"
            
        },
        showDashboard: page.Dashboard,
        showBooking: page.Booking,
        showTrack: page.Track,
        showAbout: page.About,
        
        showMyPage: page.MyPage,
        showSignIn: page.SignIn,
        showSignUp: page.SignUp,
        showSignOut: page.SignOut,
        
        showChangeDestination: page.ChangeDestination,
        showBookingDetail: page.bookingDetailSection,
        
        showSuccess: page.Success

    }));

    Backbone.history.start();

});