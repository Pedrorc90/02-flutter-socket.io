const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Heroes del Silencio' ) );
bands.addBand( new Band( 'Metallica' ) );


// Socket messages
io.on('connection', client => {
    console.log("Client connected")

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {console.log("Client disconnected") });

    client.on('emit-message', ( payload ) => {
        console.log(payload)
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