angular
    .module('labApp', [
        'ui.router',
        'ngResource'
    ])
    .config([
        "$stateProvider",
        "$urlRouterProvider",
        Router
    ])
    .factory("Recipe", [
        "$resource",
        Recipe
    ])
    .controller("indexController", [
        "$state",
        "Recipe",
        indexControllerFunction
    ])
    .controller("showController", [
        "$state",
        "$stateParams",
        "Recipe",
        showControllerFunction
    ])

function Router($stateProvider, $urlRouterProvider) {
    // $locationProvider.html5Mode(true)
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
    $urlRouterProvider.otherwise("/")
}

function Recipe($resource) {
    return $resource("/api/recipes/:recipe", {}, {
        update: {
            method: "PUT"
        }
    })

}

function indexControllerFunction($state, Recipe) {
    this.recipes = Recipe.query()
    this.newRecipe = new Recipe()
    this.create = function() {
        this.newRecipe.$save().then((recipe) => {
            $state.go("show", {
                recipe: recipe.recipe
            })
        })
    }
}

function showControllerFunction($state, $stateParams, Recipe) {
    this.recipe = Recipe.get({
        recipe: $stateParams.recipe
    })
    this.update = function() {
        this.recipe.$update({
            recipe: $stateParams.recipe
        })
    }
    this.destroy = function() {
        this.recipe.$delete({
            recipe: $stateParams.recipe
        }).then(_ => {
            $state.go("index")
        })
    }
}