var Hapi = require('hapi');
var Good = require('good');

var server = new Hapi.Server(3000);

server.route({
  method: 'GET',
  path: '/{path*}',
  handler: {
    directory: {
      path: './',
      index: true
    }
  }
});


server.pack.register(Good, function(err) {
  if(err) {
    throw err; // something bad happened loading the plugin
  }

  server.start(function() {
    server.log('info', 'Server running at: ' + server.info.uri);
  });

});

/**server.start(function (){
  console.log('Server running at:', server.info.uri);
});
**/
