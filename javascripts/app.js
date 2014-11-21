(function() {
  var app = angular.module('TaskList', ['firebase']);

  // List Controller
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

      $scope.setState = function(state) {
        $scope.currentState = state;
        
      }

      $scope.filterTask = function() {
        TasksService.filterTasks();
      };

      $scope.addTask = function() {
        TasksService.addTask(angular.copy($scope.newTask));
        $scope.newTask = {name: '', description: '', creationDate: '', expirationDate: '', completed: false, expired: false};
      };

      $scope.updateTask = function(task) {
        TasksService.updateTask(task);
      }

      $scope.removeTask = function(task) {
        TasksService.removeTask(task);
      }

      // Cycle through tasks to check expiration date => add stop with view changes
      $interval(function(){
          $scope.filterTask();
      }, 9000);


  }]);

  // Filter for showing different states (open, closed, expired)
  app.filter('taskFilter', function() {
    return function(tasks, currentState) {
      var taskList = [];
      if(currentState === "Open"){
        angular.forEach(tasks, function(task) {
          if(angular.equals(task.completed, false) && angular.equals(task.expired, false)){
            taskList.push(task);
          }
        });
      } else if(currentState === "Closed"){
        angular.forEach(tasks, function(task) {
          if(angular.equals(task.completed, true)){
            taskList.push(task);
          }
        });
      } else if(currentState === "Expired"){
        angular.forEach(tasks, function(task) {
          if(angular.equals(task.expired, true)){
            taskList.push(task);
          }
        });
      }
      return taskList;
    }
  });

  // Filter for determining days left
  app.filter('countdown', function() {
    return function(expirationDate) {
      var a = moment(expirationDate);
      var b = moment();
      return a.diff(b, 'days');
    };
  });


  // Service for seperating task concerns
  app.service('TasksService', ['$firebase', function($firebase) {
      var ref = new Firebase( 'https://intense-heat-831.firebaseio.com/');

      // create an Angular reference to the data
      var sync = $firebase(ref);

      // download the data to a local array
      var entries = sync.$asArray();

      // filters if past expiration date
      this.filterTasks = function(){
        var now = moment().format('MM/DD/YYYY');
        var entryLength = entries.length;
        for(var i = 0; i < entryLength; i++){
            if(entries[i].expirationDate < now && !entries[i].expired) {
              console.log('Task ' + entries[i].name + ' has been removed');
              entries[i].expired = true;
              this.updateTask(entries[i]);
          }
        }
      };

      this.getTasks = function(){
        return entries;
      };

      this.addTask = function(task){
        // Timestamp creationDate and format with Moment.js
        task.creationDate = moment().format("MM/DD/YYYY");
        task.expirationDate = moment().add(7, 'days').format("MM/DD/YYYY");
        entries.$add(task);
      };

      this.updateTask = function(task){
        entries.$save(task);
      };

      this.removeTask = function(task){
        entries.$remove(task);
      };
  }]);
})();
