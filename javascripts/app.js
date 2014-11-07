(function() {
  var app = angular.module('TaskList', []);

  app.controller('TaskController', function(){
    this.entries = tasks;
  });

  app.controller('ListController', function(){

  });

  app.directive('listViews', function(){
    return {
      restrict: 'E',
      templateUrl: 'list-views.html',
      controller: function(){
        this.list = 1;

        this.setView = function(View) {
          this.list = View;
        };

        this.isSet = function(checkView){
          return this.list === checkView;
        };

      },
      controllerAs: 'list',
    };
  });


  var tasks = [
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
