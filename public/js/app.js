angular
    .module('labApp', [
        'ui.router',
        'ngResource'
    ])
    .config([
        "$stateProvider",
        Router
    ])
    .factory("Recipe", [
        "$resource",
        Recipe
    ])
    .controller("indexController", [
    	"Recipe",
    	indexControllerFunction
    	])
    .controller("showController", [
    	"$stateParams"
    	"Recipe",
    	showControllerFunction])

function Router($stateProvider) {
    $stateProvider
        .state("welcome", {
            url: "/",
            templateUrl: "/assets/js/ng-views/welcome.html"
        })
        .state("index", {
            url: "/recipes",
            templateUrl: "/assets/js/ng-views/index.html",
            controller: "indexController",
            controllerAs: "vm"
        })
        .state("show", {
            url: "/recipes/:recipe",
            templateUrl: "/assets/js/ng-views/show.html",
            controller: "showController",
            controllerAs: "vm"
        })
}

function Recipe ($resource) {
    return $resource("/api/recipes/:recipe", {}, {
    	update: {method: "PUT"}
    })

}
function indexControllerFunction( Recipe ) {
	this.recipes = Recipe.query()
}

function showControllerFunction( $stateParams, Recipe) {
	this.recipe = Recipe.find($)
}
