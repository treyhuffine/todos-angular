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
    {action: "learn handlebars", done: true, newItem: false},
    {action: "learn angular", done: false, important: true, newItem: false},
    {action: "do this first", done: false, newItem: false},
    {action: "learn handlebars", done: true, newItem: false},
    {action: "learn angular", done: false, important: true, newItem: false}
  ];

  this.addNewTask = function(newTask) {
    if (newTask.action) {
      this.todos.unshift(newTask);
    }
  };
  this.updateValue = function(newAction, index) {
    this.todos[index].action = newAction;
  };
})
.controller("TodosCtlr", function($scope, todosService) {
  $scope.newTask = {};
  $scope.todos = todosService.todos;
  $scope.addNewTask = function() {
    $scope.newTask.done = false;
    $scope.newItem = false;
    todosService.addNewTask($scope.newTask);
    $scope.newTask = {};
  };
  $scope.updateValue = function(todo, keyPress, index) {
    if (keyPress === 13) {
      todosService.updateValue($scope.todos[index].action, index);
      todo.newItem = false;
    }
  };
});
