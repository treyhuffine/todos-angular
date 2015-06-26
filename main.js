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
  if (localStorage["todosList"]) {
    this.todos = JSON.parse(localStorage["todosList"]);
  }
  else {
    this.todos = [
      {action: "Sample task", done: false, newItem: false},
    ];
  }
  this.markAll = true;

  this.addNewTask = function(newTask) {
    if (newTask.action) {
      this.todos.unshift(newTask);
      localStorage["todosList"] = JSON.stringify(this.todos);
    }
  };
  this.updateValue = function(newAction, index) {
    this.todos[index].action = newAction;
    localStorage["todosList"] = JSON.stringify(this.todos);
  };
  this.toggleMarkAll = function() {
    var that = this;
    this.todos = this.todos.map(function(e) {
      e.done = that.markAll;
      return e;
    });
    this.markAll = this.markAll === false;
  };
  this.clearCompleted = function() {
    this.todos = this.todos.filter(function(e) {
      return !e.done;
    });
    localStorage["todosList"] = JSON.stringify(this.todos);
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
  $scope.clearCompleted = todosService.clearCompleted;
});
