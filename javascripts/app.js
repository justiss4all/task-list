(function() {
  var app = angular.module('TaskList', ['firebase']);

  // List Controller
  app.controller('ListController',['$scope', 'TasksService', function ($scope, TasksService) {
      $scope.newTask = {
        name: '',
        description: '',
        creationDate: '',
        completed: false,
        };

      $scope.tasks = TasksService.getTasks();


      $scope.addTask = function() {
        TasksService.addTask(angular.copy($scope.newTask));
        $scope.newTask = {name: '', description: '', creationDate: '', completed: false};
      };

      $scope.updateTask = function(task) {
        TasksService.updateTask(task);
      }

      $scope.removeTask = function(task) {
        TasksService.removeTask(task);
      }

  }]);

  // Service for seperating task concerns
  app.service('TasksService', ['$firebase', function($firebase) {
      var ref = new Firebase( 'https://intense-heat-831.firebaseio.com/');

      // create an Angular reference to the data
      var sync = $firebase(ref);

      // download the data to a local array
      var entries = sync.$asArray();

      this.getTasks = function(){
        return entries;
      };

      this.addTask = function(task){
        // Timestamp creationDate and format with Moment.js
        var ts = task.creationDate
        task.creationDate = moment(ts).format("MM/DD/YYYY");
        entries.$add(task);
      };

      this.updateTask = function(task){
        entries.$save(task);
      };

      this.removeTask = function(task){
        entries.$remove(task);
      };


  }]);

  app.directive('taskDetails', function(){
    return {
      restrict: 'E',
      templateUrl: '/templates/task-details.html',
      controller: function(){
        // this controller will manage individual task f(x)'s
      },
      controllerAs: 'taskCtrl',
    };
  });

})();
