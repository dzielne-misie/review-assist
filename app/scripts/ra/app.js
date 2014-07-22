"use strict";

angular.module("ra", ["ngRoute"]);

angular.module("ra").config([
	"$routeProvider",
	"$locationProvider",
	function(
		$routeProvider,
		$locationProvider
	) {
		$routeProvider
			.when("/", {
				templateUrl: "/views/ra/index.html",
				controller: "IndexCtrl"
			})
			.when("/404", {
				templateUrl: "/views/ra/404.html",
				controller: "PageCtrl"
			})
			.otherwise({
				redirectTo: "/404"
			});

		$locationProvider.html5Mode(true);
	}
]);
