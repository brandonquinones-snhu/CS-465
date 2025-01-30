const Mongoose = require('./db');
const Trip = require('./travlr');

var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const seedDB = async () => {
    try {
        // Wait for the database connection
        await Mongoose.connection.asPromise();

        // Troubleshooting logs
        console.log('Connected to MongoDB, seeding database...');
        
        // Delete existing trips and insert new ones
        await Trip.deleteMany({});
        await Trip.insertMany(trips);

        console.log('Seeding completed successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        // Close the connection
        await Mongoose.connection.close();
        process.exit(0);
    }
};

seedDB();
