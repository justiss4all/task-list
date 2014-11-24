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
