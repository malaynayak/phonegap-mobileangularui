angular.module('MyApp.controllers.Login', [
	'MyApp.services.Auth'
])

.controller("loginController",["$scope", "$rootScope", "$location", "AuthService",
	function($scope, $rootScope, $location, AuthService){

	if(AuthService.isLoggedIn()) 
			$location.path('/profile');

	$scope.credentials={
		username : "",
		password : ""
	}

	$scope.invalidLogin = false;

	$scope.login = function(){
		if(AuthService.login($scope.credentials)){
			$location.path('/profile');
			$rootScope.loggedIn = true;
		} else {
			$scope.invalidLogin = true;
		}
	}

	$scope.logout = function(){
		AuthService.logout();
		$rootScope.loggedIn = false;
		$location.path('/login');
	}
}]);