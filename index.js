
const express = require('express');
const path = require('path') // Coming from node
require('dotenv').config();

// Express app
const app = express(); // Init express and ready to listen
app.set('port', process.env.PORT || 3000);
// Node server
const server = require('http').createServer(app); // Create server
module.exports.io = require('socket.io')(server);

require('./sockets/socket');


// Public path
const publicPah = path.resolve( __dirname, 'public' )
app.use( express.static(publicPah));



// We can listen whatever request to port 3000
server.listen( process.env.PORT, ( err ) => {
    if ( err ) throw new Error(err);
    console.log('Server running in port', process.env.PORT);
})