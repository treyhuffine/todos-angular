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
    {action: "do this first", done: false, color: "orange", newItem: false},
    {action: "learn handlebars", done: true, color: "blue", funky: true, newItem: false},
    {action: "learn angular", done: false, color: "green", important: true, newItem: false},
    {action: "do this first", done: false, color: "orange", funky: true, newItem: false},
    {action: "learn handlebars", done: true, color: "blue", newItem: false},
    {action: "learn angular", done: false, color: "green", important: true, newItem: false}
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
  }
});
