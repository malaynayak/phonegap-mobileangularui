angular.module('MyApp.controllers.Gallery', [
	'MyApp.directives.Custom',
  	'MyApp.services.Albums',
])

.controller("galleryController",["$scope", "$rootScope", "albums","$routeParams",function($scope, $rootScope, albums,$routeParams){
	$scope.albums = [];
	$scope.photos = [];
	$scope.page = 1;

	$scope.nextPage = function(type){
		$rootScope.loading = true;
		$scope.page++;
		var s = ($scope.page-1)*10;
		if(type == 'album'){
			$scope.loadAlbums(s, s+10);
		} else {
			$scope.loadPhotos(s, s+10);
		}
	}

	$scope.loadAlbums = function(start, end){
		albums.getAlbums(start, end).then(function(data){
			if(data.data.length){
				for(k in data.data){
					$scope.albums.push(data.data[k]);
				}
			}
			var rows = ($scope.albums.length % 2 == 0)? ($scope.albums.length / 2) : ($scope.albums.length / 2 + 1);
			$scope.rowArray = new Array(Math.round(rows));
			$rootScope.loading = false;
		},function(err){
			console.log(err);
		});
	}

	$scope.loadPhotos = function(start, end){
		albums.getPhotos($routeParams.id,start, end).then(function(data){
			if(data.data.length){
				for(k in data.data){
					$scope.photos.push(data.data[k]);
				}
			}
			var rows = ($scope.photos.length % 6 == 0)? 
				($scope.photos.length / 6) : ($scope.photos.length / 6 + 1);
			$scope.photoRowArray = new Array(Math.round(rows));
			$rootScope.loading = false;
		},function(err){
			console.log(err);
		});
	}

	if($routeParams.id !== undefined){
		$scope.albumId = $routeParams.id;
		$scope.loadPhotos(0,10);
	} else {
		$scope.loadAlbums(0,10);
	}
}]);