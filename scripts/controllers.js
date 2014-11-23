(function(){
  var app = angular.module('task-controllers', []);

  app.controller('ListController',['$scope', '$interval', 'TasksService', function ($scope, $interval, TasksService) {
    $scope.newTask = {
      name: '',
      description: '',
      creationDate: '',
      expirationDate: '',
      completed: false,
      expired: false,
    };

    $scope.tasks = TasksService.getTasks();

    $scope.currentState = "Open";

    $scope.stateClass = "";

    $scope.stateHeader = "Close";

    $scope.setState = function(state) {
      $scope.currentState = state;
      if(state === "Closed"){
        $scope.stateHeader = "Closed";
        $scope.stateClass = "bg-success";
      } else if(state === "Expired"){
        $scope.stateHeader = "Expired";
        $scope.stateClass = "bg-danger";
      } else {
        $scope.stateHeader = "Close";
        $scope.stateClass = "";
      }
    };

    $scope.isSet = function(state) {
      if(state === $scope.currentState){
        return true;
      }
    };

    $scope.filterTask = function() {
      TasksService.filterTasks();
    };

    $scope.addTask = function() {
      TasksService.addTask(angular.copy($scope.newTask));
      $scope.newTask = {name: '', description: '', creationDate: '', expirationDate: '', completed: false, expired: false};
    };

    $scope.updateTask = function(task) {
      TasksService.updateTask(task);
    };

    $scope.removeTask = function(task) {
      TasksService.removeTask(task);
    };

    // Cycle through tasks to check expiration date => add stop with view changes
    $interval(function(){
      $scope.filterTask();
    }, 9000);

  }]);
  
})();
