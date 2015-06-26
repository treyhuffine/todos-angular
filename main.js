var todos = angular.module("todosApp", ["ngRoute"]);

todos
.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      controller: "TodosCtlr",
      templateUrl: "list.html"
    })
    .otherwise({
      redirectTo: "/"
    });
})
.service("todosService", function() {
  this.todos = [
    {action: "do this first", done: false, newItem: false},
    {action: "learn handlebars", done: true, funky: true, newItem: false},
    {action: "learn angular", done: false, important: true, newItem: false},
    {action: "do this first", done: false, funky: true, newItem: false},
    {action: "learn handlebars", done: true, newItem: false},
    {action: "learn angular", done: false, important: true, newItem: false}
  ];

  this.addNewTask = function(newTask) {
    this.todos.unshift(newTask)
  }
})
.controller("TodosCtlr", function($scope, todosService) {
  $scope.newTask = {};
  $scope.todos = todosService.todos;
  $scope.addNewTask = function() {
    $scope.newTask.done = false;
    $scope.newItem = false;
    todosService.addNewTask($scope.newTask);
    $scope.newTask = {};
  }
});
