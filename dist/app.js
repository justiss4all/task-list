(function () {

  angular
        .module('TaskList', [
          'firebase',
          'task-controllers',
          'task-services',
          'task-filters'
        ]);
})();

(function () {
  'use strict';

  angular
      .module('task-controllers', [])
      .controller('ListController', ListController);

  ListController.$inject = ['$scope', '$interval', 'TasksService'];

  function ListController($scope, $interval, TasksService) {
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
      if ( state === "Closed" ) {
        $scope.stateHeader = "Closed";
        $scope.stateClass = "bg-success";
      } else if ( state === "Expired" ){
        $scope.stateHeader = "Expired";
        $scope.stateClass = "bg-danger";
      } else {
        $scope.stateHeader = "Close";
        $scope.stateClass = "";
      }
    };

    $scope.isSet = function(state) {
      if ( state === $scope.currentState ) {
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

    // Cycle through tasks to check expiration date
    $interval(function(){
      $scope.filterTask();
    }, 5000);

  }

})();

(function () {
  'use strict';

  angular
      .module('task-filters', [])
      .filter('taskFilter', taskFilter)
      .filter('countdown', countdown);


  function taskFilter() {
    return function(tasks, currentState) {
      var taskList = [];
      if ( currentState === "Open" ) {
        angular.forEach(tasks, function(task) {
          if ( angular.equals( task.completed, false ) && angular.equals( task.expired, false )) {
            taskList.push(task);
          }
        });
      } else if ( currentState === "Closed" ) {
        angular.forEach(tasks, function(task) {
          if( angular.equals( task.completed, true )) {
            taskList.push(task);
          }
        });
      } else if ( currentState === "Expired" ) {
        angular.forEach(tasks, function(task) {
          if ( angular.equals(task.expired, true) && angular.equals(task.completed, false) ) {
            taskList.push(task);
          }
        });
      }
      return taskList;
    }; 
  }

  function countdown() {
    return function(expirationDate) {
      var a = moment(expirationDate);
      var b = moment();
      return a.diff(b, 'days');
    };
  }

})();

(function () {
  'use-strict';

  angular
      .module('task-services', [])
      .service('TasksService', TasksService);

  TasksService.$inject = ['$firebase'];

  function TasksService($firebase) {
    var ref = new Firebase( 'https://intense-heat-831.firebaseio.com/');

    // create an Angular reference to the data
    var sync = $firebase(ref);

    // download the data to a local array
    var entries = sync.$asArray();

    // filters if past expiration date
    this.filterTasks = function() {
      var now = moment().format('MM/DD/YYYY');
      var entryLength = entries.length;
      for ( var i = 0; i < entryLength; i++ ) {
        if ( entries[i].expirationDate < now && !entries[i].expired ) {
          console.log('Task ' + entries[i].name + ' has been removed');
          entries[i].expired = true;
          this.updateTask(entries[i]);
        }
      }
    };

    this.getTasks = function() {
      return entries;
    };

    this.addTask = function(task) {
      task.creationDate = moment().format("MM/DD/YYYY");
      task.expirationDate = moment().add(7, 'days').format("MM/DD/YYYY");
      entries.$add(task);
    };

    this.updateTask = function(task) {
      entries.$save(task);
    };

    this.removeTask = function(task) {
      entries.$remove(task);
    };
  }

})();
