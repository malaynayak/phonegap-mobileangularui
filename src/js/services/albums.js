angular.module('MyApp.services.Albums', [])
.factory("albums", ["$http", function($http){
	return {
		getAlbums : function(start,end){
			return $http.get('https://jsonplaceholder.typicode.com/albums?'
				+'_start='+start+'&'+'_end='+end);
		},
		getPhotos : function(albumId,start,end){
			return $http.get('https://jsonplaceholder.typicode.com/albums/'+albumId+'/photos?'
				+'_start='+start+'&'+'_end='+end);
		}
	};
}]);