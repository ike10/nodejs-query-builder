// src/index.js
const queryBuilder = require('./queryBuilder');
const indexing = require('./indexing');
const expressMiddleware = require('../middleware/express'); // Adjust the path as needed

// Export the main functionality of the library
module.exports = {
  queryBuilder,
  indexing,
  expressMiddleware,
  // Add other exported modules here
};
