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

    /**
     * Define application-domain entities and collections.
     */
    // Define the base entity. Not accessible from outside current scope.
    var Entity = Kinvey.Entity.extend({
	// Override constructor to use the OfflineStore. (Took this out.)
	constructor: function(attr, collection) {
	    Kinvey.Entity.prototype.constructor.call(this, attr, collection);
	},

	// Convenience shortcut for returning the last modified date.
	added: function() {
	    return this.getMetadata().lastModified();
	}
    });

    // Reservation: _id, meal, user
    App.reservationEntity = new Kinvey.Entity({}, 'reservations');
    // Meal: _id, title
    App.mealEntity = new Kinvey.Entity({}, 'meals');
    
    App.kinveyLogin = function( token, name ) {
        // Create a new user instance, and login using the Facebook oAuth token.
        var user = new Kinvey.User({});
        user.loginWithFacebook(token, { // Login
            name: name
	  }, {
            success: function(user) {
		// Facebook account is now linked to a Kinvey.User.
		// user.getIdentity() will return the users Facebook identity.
		App.kinveyHelper = new KinveyHelper(user);
                console.log("kinvey user set");
            },
            error: function(error) {
                console.log("error occurred");
		// An error occurred.
            }
        });
    }
    
    App.kinveyLogout = function() {
      var user = Kinvey.getCurrentUser();
      if(null !== user) {
	user.logout({
          success: function() {
            // user is now logged out.
          },
          error: function() {
            // An error occurred.
          }
        });
      }
      App.kinveyHelper = null;
    }
}(window, Kinvey));
