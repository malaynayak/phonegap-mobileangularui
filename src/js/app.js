angular.module('MyApp', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  'MyApp.controllers.Main',
  'MyApp.controllers.Posts',
  'MyApp.controllers.Gallery',
  'MyApp.controllers.Plugin'
])

.run(function($transform) {
  window.$transform = $transform;
})

.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html", 
        reloadOnSearch: false
    })
    .when("/posts", {
        templateUrl : "posts.html",
        controller : "postsController",
        reloadOnSearch: false
    })
    .when("/posts/:id/", {
        templateUrl : "post.html",
        controller : "postsController",
        reloadOnSearch: false
    })
    .when("/gallery/", {
        templateUrl : "gallery.html",
        controller : "galleryController",
        reloadOnSearch: false
    })
    .when("/gallery/:id/", {
        templateUrl : "photos.html",
        controller : "galleryController",
        reloadOnSearch: false
    })
    .when("/plugins/", {
        templateUrl : "plugins.html",
        controller : "pluginController",
        reloadOnSearch: false
    })
    .when("/plugins/location", {
        templateUrl : "location.html",
        controller : "locationController",
        reloadOnSearch: false
    })
    .otherwise("/", {
        redirectTo  : "/"
    });
});