angular.module('MyApp.controllers.Main', [])

.controller('MainController', ["$rootScope", "$scope",function($rootScope, $scope){
  	$scope.swiped = function(direction) {
    	alert('Swiped ' + direction);
	};

	// User agent displayed in home page
	$scope.userAgent = navigator.userAgent;

	// Needed for the loading screen
	$rootScope.$on('$routeChangeStart', function() {
		$rootScope.loading = true;

	});

	$rootScope.$on('$routeChangeSuccess', function() {
		$rootScope.loading = false;
		if($scope.checkConnection() == 'No network connection'){
			$scope.noConnectionAlert();
		}
	});

	$scope.checkConnection = function() {
		if(navigator.connection !== undefined){
			var networkState = navigator.connection.type;
		    var states = {};
		    states[Connection.UNKNOWN]  = 'Unknown connection';
		    states[Connection.ETHERNET] = 'Ethernet connection';
		    states[Connection.WIFI]     = 'WiFi connection';
		    states[Connection.CELL_2G]  = 'Cell 2G connection';
		    states[Connection.CELL_3G]  = 'Cell 3G connection';
		    states[Connection.CELL_4G]  = 'Cell 4G connection';
		    states[Connection.CELL]     = 'Cell generic connection';
		    states[Connection.NONE]     = 'No network connection';
		    return states[networkState];
		}
	    return 'Unknown connection';
	}

	$scope.noConnectionAlert = function(){
		navigator.notification.alert(
	        "Please connect to the internet and retry",  
	        function(){}, 
	        'No Internet Connection',          
	        'Close'                 
	    );
	}

	document.addEventListener("offline", $scope.noConnectionAlert , false);

}]);