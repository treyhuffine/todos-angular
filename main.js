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
  this.markAll = true;
  this.addNewTask = function(newTask) {
    if (newTask.action) {
      this.todos.unshift(newTask);
    }
  };
  this.updateValue = function(newAction, index) {
    this.todos[index].action = newAction;
  };
  this.toggleMarkAll = function() {
    var that = this;
    this.todos = this.todos.map(function(e) {
      e.done = that.markAll;
      return e;
    });
    this.markAll = this.markAll === false;
  };
})
.controller("TodosCtlr", function($scope, todosService) {
  $scope.newTask = {};
  $scope.todos = todosService.todos;
  $scope.markAll = todosService.markAll;
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
  $scope.toggleMarkAll = todosService.toggleMarkAll;
});
