(function() {
  var app = angular.module('TaskList', []);

  // Main Controller for rendering list of tasks
  app.controller('ListController',['$scope', function($scope) {

    $scope.tasks = entries;

    $scope.view = 1;

    $scope.setView = function(setView) {
      $scope.view = setView;
      console.log(setView);
    };

    $scope.isSet = function(checkView){
      return $scope.view === checkView;
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


  var entries = [
    {
      name: 'First task',
      description: 'This is our first task for wireframing',
      creationDate: '1132014',
      completionDate: null,
      completed: false,
    },
    {
      name: 'Second task',
      description: 'This is our second task for wireframing',
      creationDate: '128832362300',
      completionDate: null,
      completed: false,
    },
    {
      name: 'Third task',
      description: 'This is our third task for wireframing',
      creationDate: '11/4/2014',
      completionDate: null,
      completed: false,
    }
  ];
})();
