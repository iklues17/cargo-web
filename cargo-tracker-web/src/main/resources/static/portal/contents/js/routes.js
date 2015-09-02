$(function(){

    var AppRouter = new (Backbone.Router.extend({
        routes: {
        	// Menu View
            "": "showDashboard",
            "booking": "showBooking",
            "track": "showTrack",
            "my-page": "showMyPage",
            "about": "showAbout",
            "sign-in": "showSignIn",
            "sign-up": "showSignUp",
            // Subview
            "change-destination/:bookingId": "showChangeDestination",
            // Util View
            "success": "showSuccess"
            
        },
        showDashboard: page.Dashboard,
        showBooking: page.Booking,
        showTrack: page.Track,
        showMyPage: page.MyPage,
        showAbout: page.About,
        showSignIn: page.SignIn,
        showSignUp: page.SignUp,
        showChangeDestination: page.ChangeDestination,
        showSuccess: page.Success

    }));

    Backbone.history.start();

});