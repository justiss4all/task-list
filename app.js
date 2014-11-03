(function() {
  var app = angular.module('TaskList', []);

  app.controller('TaskController', function(){
    this.entry = task;
  });

  var task = {
    name: 'First task',
    description: 'This is our first task for wireframing',
    creationDate: '11/3/2014',
    completionDate: null,
    completed: false
  }

})();
