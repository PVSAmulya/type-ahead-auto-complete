/**
 * server to run the app in production mode.
 * without installing node_modules loads required files from /dist folder
 */
/**
 * Node.js middleware for serving a favicon.
 */
const favicon = require('serve-favicon');

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use((morgan('combined')));

/**
 * serves static files present in /dist/auto-complete
 */
app.use(express.static(__dirname + '/dist/auto-complete'));

/**
 * User agents request favicon.ico frequently and indiscriminately, so you may wish to exclude these requests from your logs by using this middleware before your logger middleware.
 * This module caches the icon in memory to improve performance by skipping disk access.
 * This module provides an ETag based on the contents of the icon, rather than file system properties.
 * This module will serve with the most compatible Content-Type.
 */
app.use(favicon(__dirname + "/dist/auto-complete/assets/favicon.ico"));

/**
 * app.all takes multiple callbacks, and meant for routing.
 */
app.all('*', (req, res) => {
  /**
   *  Send all other requests to the Angular app 
   */
  res.status(200).sendFile(__dirname + '/dist/auto-complete/index.html');
});

/**
 * creates http server to run the app
 */
const server = require('http').createServer(app);

/**
 * accepts a parameter from the environment what port to listen on. if exists any otherwise takes 5555
 */
server.listen(process.env.PORT || 5555);
/**
 * if error onError will be called
 */
server.on('error', onError);
/**
 * if no errors on Listening will be called
 */
server.on('listening', onListening);

/**
 * Event listener for HTTP app "error" event.
 */

function onError(error) {
  /**
   * error.syscall A string that describes syscall tat failed
   */
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  /**
   * handle specific listen errors with friendly messages
   * if the address is already using in other server throws error and displace message in console 
   */ 
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP app "listening" event.
 *  server starts on the respective port 5555 or if given in environment variables
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
    /**
     * logs the message with the port number 
     */
  console.log('Listening on ' + bind);
}
