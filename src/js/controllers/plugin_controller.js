angular.module('MyApp.controllers.Plugin', [])

.controller("pluginController",["$scope", "$rootScope",function($scope, $rootScope){
	$scope.openCamera = function(){
		console.log(navigator.camera);
		navigator.camera.getPicture(function(imageData){
			var image = document.getElementById('cam');
   			image.src = "data:image/jpeg;base64," + imageData;
		}, function(message){
			$scope.vibrate(3000);
			navigator.notification.alert(
			    message,  
			    function(){}, 
			    'Error while opening camera',          
			    'Close'                 
			);
		},{'saveToPhotoAlbum':true});
	}
	$scope.openDialog = function(){
		navigator.notification.alert(
		    "This a sample message",  
		    function(){}, 
		    'Dialog window',          
		    'Close'                 
		);
	}
	$scope.vibrate = function(seconds){
		navigator.vibrate(seconds);
	}
	$scope.scanBarcode = function(){
		cordova.plugins.barcodeScanner.scan(
	      function (result) {
	      	navigator.notification.alert(
			    "Result: " + result.text + "\n" +
	                "Format: " + result.format + "\n" +
	                "Cancelled: " + result.cancelled,  
			    function(){}, 
			    'Scan Sucessfull',          
			    'Close'                 
			);
	      },
	      function (error) {
	          alert("Scanning failed: " + error);
	      },
	      {
	          showFlipCameraButton : true, // iOS and Android
	          showTorchButton : true, // iOS and Android
	          prompt : "Place a barcode inside the scan area", // Android
	          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
	          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
	          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
	      }
	    );
	}
	
}])

.controller("locationController",["$scope", function($scope){
	$scope.latitude = undefined;
	$scope.longitude = undefined;

	navigator.geolocation.getCurrentPosition(
		function (position) {
			$scope.$apply(function(){
				$scope.latitude = position.coords.latitude;
	    		$scope.longitude = position.coords.longitude;
			});
		}, function(error) {
		    console.log('code: ' + error.code + '\n' +
		        'message: ' + error.message + '\n');
		}, { enableHighAccuracy: true }
	);
}]);