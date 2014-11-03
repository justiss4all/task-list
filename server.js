var Hapi = require('hapi');
var Good = require('good');

var server = new Hapi.Server(3000);

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply){
    reply('Hello!');
  }
});

server.route({
  method: ['PUT', 'POST'],
  path: '/',
  handler: function(request, reply){
    reply('I did something!');
  }
});


server.route({
  method:'GET',
  path:'/hello/{user}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.user) + '!');
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
