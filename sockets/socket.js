const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band( 'Linkin Park' ) );
bands.addBand( new Band( 'Marea' ) );
bands.addBand( new Band( 'Extremoduro' ) );
bands.addBand( new Band( 'Imagine Dragons' ) );


// Socket messages
io.on('connection', client => {
    console.log("Client connected")

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {console.log("Client disconnected") });

    client.on('emit-message', ( payload ) => {
        client.broadcast.emit('new-message', payload); // Emit to all except who emitted
    });

    client.on('vote-band', ( payload ) => {
        bands.voteBand( payload.id );
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', ( payload ) => {
        bands.addBand( new Band( payload.name ) );
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', ( payload ) => {
        bands.deleteBand( payload.id );
        io.emit('active-bands', bands.getBands());
    });

  });