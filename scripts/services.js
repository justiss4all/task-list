(function (){
  var app = angular.module('task-services', []);
  
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
