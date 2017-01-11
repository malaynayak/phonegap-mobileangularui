angular.module('MyApp.controllers.Posts', [
	'MyApp.services.Posts', 
])

.controller("postsController",["$scope", "$rootScope", "posts", "$routeParams",
	function($scope, $rootScope, posts, $routeParams){
	$scope.posts = [];
	$scope.page = 1; 
	
	$scope.nextPage = function(){
		$rootScope.loading = true;
		$scope.page++;
		var s = ($scope.page-1)*10;
		$scope.loadPosts(s, s+10);
	}

	$scope.loadPosts = function(start, end){
		posts.getPosts(start, end).then(function(data){
			if(data.data.length){
				for(k in data.data){
					$scope.posts.push(data.data[k]);
				}
			}
			$rootScope.loading = false;
		},function(err){
			console.log(err);
		});
	}

	if($routeParams.id !== undefined){
		$scope.postId = $routeParams.id;
		posts.getPost($routeParams.id).then(function(data){
			$scope.post = data.data;

			posts.getAuthor($scope.post.userId).then(function(data){
				$scope.author = data.data;
			},function(err){
				console.log(err);
			});

			posts.getComments($scope.postId).then(function(data){
				$scope.comments = data.data;
			},function(err){
				console.log(err);
			});

		},function(err){
			console.log(err);
		});
	} else {
		$scope.loadPosts(0,10);
	}
}]);