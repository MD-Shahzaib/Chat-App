// Import-mongoose-and-dotenv.
require('dotenv').config();
const mongoose = require('mongoose');

// Connection-URI.
const mongoURI = process.env.MONGO_URI;

// Connect-to-mongodb
mongoose.connect(mongoURI);

// Export-mongoose.
module.exports = mongoose;