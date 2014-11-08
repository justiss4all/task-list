(function() {
  var app = angular.module('TaskList', []);

  // Main Controller for rendering list of tasks
  app.controller('ListController',['$scope', function($scope) {

    $scope.tasks = [];
    $scope.today = new Date();
    $scope.expDate = new Date();
    $scope.view = 1;

    $scope.setView = function(setView) {
      $scope.view = setView;

    };

    $scope.isSet = function(checkView){
      return $scope.view === checkView;
    };

    $scope.listTasks = function(status) {
      $scope.tasks = [];
      $scope.expDate.setDate($scope.today.getDate()-7);

      if (status === "Open"){
        for (var prop in entries) {
          var createdOn = new Date(entries[prop].creationDate);
          if(createdOn > $scope.expDate) {
            $scope.tasks.push(entries[prop]);
          }
        }
      }
      else if (status === "Expired") {
          for (var prop in entries) {
            var createdOn = new Date(entries[prop].creationDate);
            if(createdOn < $scope.expDate){
              $scope.tasks.push(entries[prop]);
            }
          }
        }
        else {
          console.log("Closed Items");
          for (var prop in entries) {
            if(entries[prop].completed){
              $scope.tasks.push(entries[prop]);
            };
          }
        };
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
      creationDate: '11/1/2014',
      completionDate: null,
      completed: true,
    },
    {
      name: 'Second task',
      description: 'This is our second task for wireframing',
      creationDate: '11/8/2014',
      completionDate: null,
      completed: true,
    },
    {
      name: 'Third task',
      description: 'This is our third task for wireframing',
      creationDate: '11/4/2014',
      completionDate: null,
      completed: true,
    }
  ];
})();
