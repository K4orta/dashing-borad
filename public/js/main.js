var app = angular.module('dashboard', []);

var sortByTime = function(input) {
	if (input[0].directions) {
		return _.sortBy(input, function(route) {
			return route.directions[0].departures[0];
		});
	}
	return _.sortBy(_.filter(input, function(route) { return route.departures; }), function(route) {
		return route.departures[0];
	});
};

var DashCtrl = function($scope, $http, $interval) {
	$scope.weather = {};

	//Setup and update the clock
	$scope.currentTime = moment(new Date().getTime());
	$interval(function() {
		$scope.currentTime = moment(new Date().getTime());
	}, 1000);

	$scope.transit = {};
	$scope.bart = {};

	$http.get('/weather').then(function(resp) {
		$scope.weather = resp.data;
	});
	$http.get('/transit/muni').then(function(resp) {
		$scope.transit = sortByTime(resp.data);
	});
	$http.get('/transit/11').then(function(resp) {
		$scope.bart = sortByTime(resp.data);
	});

	$interval(function() {
		$http.get('/transit/muni').then(function(resp) {
			$scope.transit = sortByTime(resp.data);
		});
		$http.get('/transit/11').then(function(resp) {
			$scope.bart = sortByTime(resp.data);
		});
	}, 60000);

	$interval(function() {
		$http.get('/weather').then(function(resp) {
			$scope.weather = resp.data;
		});
	}, 300000);

	$scope.routeIcon = function(route) {
		return "/images/muni/" + route.code + ".svg";
	};

	$scope.bartRouteClass = function(route) {
		return "bart-" + route.code;
	};

	$scope.chopMuniName = function(name) {
		// console.log()
		return _.last(name.split("-"));
	};
};

app.filter('moment', function() {
	return function(input) {
		return moment(input * 1000).format('ddd');
	}
});

app.filter('trunk', function() {
	return function(input) {
		return Math.round(input);
	}
});

app.filter('weatherIcon', function() {
	var weatherIcons = {
		'partly-cloudy-day': 'day-cloudy',
		'partly-cloudy-night': 'night-cloudy',
		'clear-night': 'night-clear',
		'clear-day': 'day-sunny',
		'fog': 'fog',
		'rain': 'rain',
		'cloudy': 'cloudy',
		'wind': 'cloudy-gusts'
	}
	return function(input) {
		if(weatherIcons[input]){
			return 'wi-' + weatherIcons[input];
		} 
		return input;
	}
});