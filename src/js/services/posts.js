angular.module('MyApp.services.Posts', [])
.factory("posts", ["$http", function($http){
	return {
		getPosts : function(start,end){
			return $http.get('https://jsonplaceholder.typicode.com/posts?'
				+'_start='+start+'&'+'_end='+end);
		},
		getPost : function(postId){
			return $http.get('https://jsonplaceholder.typicode.com/posts/'+postId);
		},
		getAuthor : function(userId){
			return $http.get('https://jsonplaceholder.typicode.com/users/'+userId);
		},
		getComments: function(postId){
			return $http.get('https://jsonplaceholder.typicode.com/posts/'+postId+'/comments');
		}
	};
}]);

