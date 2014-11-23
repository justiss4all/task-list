(function () {

  angular
        .module('TaskList', [
          'firebase',
          'task-controllers',
          'task-services',
          'task-filters'
        ]);
})();
