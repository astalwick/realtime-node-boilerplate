/**
 * Module dependencies.
 */

var express       = require('express')
  , routes        = require('./routes')
  , path          = require('path')
  , http          = require('http')
  , _             = require('underscore')
  , jade_browser  = require('jade-browser')
  ;

/* Create the server */
var app = express()
  , server = http.createServer(app)
  ;


/* JUST in case mongo's being used.... */

/* Connect to the database */
/*
var MONGO_SERVER = 'localhost'
  , MONGO_DB_NAME = 'backbone'

mongoose.connect('mongodb://' + MONGO_SERVER + '/' + MONGO_DB_NAME, { server : { poolSize : 3 } });
mongoose.connection.on('error', function(err) {
  console.log(err);
});
*/


// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Wire up our client side templates.
// This will basically package all of our templates up in a single .js file.
// On the client, we can then render those templates whenever we need.
app.use(jade_browser('/js/templates.js', '**', {root: __dirname + '/public/js/templates', minify: true}));

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Socket.io
var io = require('socket.io').listen(server);

/**
 * our socket transport events
 *
 * You will notice that when we emit the changes
 * in `create`, `update`, and `delete` we both
 * socket.emit and socket.broadcast.emit
 *
 * socket.emit sends the changes to the browser session
 * that made the request. not required in some scenarios
 * where you are only using ioSync for Socket.io
 *
 * socket.broadcast.emit sends the changes to
 * all other browser sessions. this keeps all
 * of the pages in mirror. our client-side model
 * and collection ioBinds will pick up these events
 */

io.sockets.on('connection', function (socket) {

  socket.on('item:create', function (data, callback) {
    /* do something to 'create' the whatever */
    var response = {
      created: true
    }

    // echo the response
    callback(null, item)
    socket.broadcast.emit('item:create', item);
    socket.emit('item:create', item);
  });

  socket.on('item:read', function (data, callback) {
    /* do something to 'read' the whatever */
    var item = {
        text: 'hello world'
      , read: true
    }
    callback(err, item);
  });

  socket.on('item:update', function (data, callback) {
    var item = {
      updated: true
    }
    socket.broadcast.emit('item/' + data.id + ':update', item);
    callback(null, item);
  });

  socket.on('albums:patch', function (data, callback) {
    var item = {
      patched: true
    }
    socket.broadcast.emit('item/' + data.id + ':update', item);
    callback(null, item);
  });

  socket.on('albums:delete', function (data, callback) {
    var item = {
      deleted: true
    }    
    socket.broadcast.emit('albums/' + data.id + ':delete', json);
    socket.emit('albums/' + data.id + ':delete', json);
    callback(null, json);    
  });

});

// Routes
app.get('/', routes.index);

if (!module.parent) {
  server.listen(3000);
  console.log("Realtime nodejs socket.io boilerplate", app.settings.env);
}
