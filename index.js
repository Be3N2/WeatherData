

var path = process.cwd();
var yearHandlers = require(path + '/controllers/yearHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (request, response, next) {
		if (request.isAuthenticated()) {
			return next();
			//if authenticated returns true then go to next async express call
		} else {
			response.redirect('/login');
		}
	}

	var yearHandler = new yearHandlers();

	app.route('/').get(isLoggedIn, function (request, response) {
		response.sendFile(path + '/public/index.html');
	});

	app.route('/login').get(function(request, response) {
		response.sendFile(path + '/public/login.html');
	});

	app.route('/logout').get(function (request, response) {
		//passport includes logout on request object
		request.logout();
		response.redirect('/login');
	});

	app.route('/profile').get(isLoggedIn, function (request, response) {
		response.sendFile(path + '/public/profile.html');
	});

	//gets user data
	app.route('/api/:id').get(isLoggedIn, function (request, response) {
		response.json(request.user.github);
	});

	//initializes login verification
	app.route('/auth/github').get(passport.authenticate('github'));

	//callback from verification
	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
	}));

	app.route('/api:id/yearData')
		.get(isLoggedIn, yearHandler.getAppData)
		.post(isLoggedIn, yearHandler.saveAppData);
	//post and delete as well
	//reference http://www.clementinejs.com/tutorials/tutorial-passport.html#AuthorizationConfiguration


}