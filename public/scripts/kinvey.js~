(function(window, Kinvey) {

    // Export.
    var App = window.App = {};

    // Configure conflict policy prior to init, since that will trigger
    // synchronization. Prioritize client over server.
    Kinvey.Sync.configure({ conflict: Kinvey.Sync.clientAlwaysWins });

    Kinvey.init({
        appKey: 'kid_VVkPZWN-TJ',
        appSecret: 'f0126131e0e54b7c83db4c27730c4d3e',
        sync: true
    });

    var KinveyHelper = function(user) {
        this.user = user;
        console.log(user.getIdentity());
    };

    App.kinveyHelper = null;
    
    function kinveyLogin( token ) {
        // Create a new user instance, and login using the Facebook oAuth token.
        var user = new Kinvey.User({});
        user.loginWithFacebook(token, {
            success: function(user) {
		// Facebook account is now linked to a Kinvey.User.
		// user.getIdentity() will return the users Facebook identity.
		App.kinveyHelper = new KinveyHelper(user);
            },
            error: function(error) {
		// An error occurred.
            }
        });
    }
}(window, Kinvey));
