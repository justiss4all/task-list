(function() {
  var app = angular.module('TaskList', []);

  app.controller('TaskController', function(){
    this.entries = tasks;
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
      creationDate: '1288323623006',
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
