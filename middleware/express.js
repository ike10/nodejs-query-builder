// middleware/express.js

const express = require('express');
const QueryBuilder = require('../src/queryBuilder'); // Adjust the path as needed

class SearchMiddleware {
  constructor(indexingService) {
    this.indexingService = indexingService;
    this.router = express.Router();
  }

  setupRoutes() {
    this.router.get('/search', this.handleSearchRequest.bind(this));
    // Add more routes as needed
  }

  async handleSearchRequest(req, res) {
    try {
      const { q, category, priceFrom, priceTo } = req.query;

      const queryBuilder = new QueryBuilder();
      if (q) {
        queryBuilder.searchQuery(q);
      }
      if (priceFrom || priceTo) {
        queryBuilder.filterNumericRange('price', priceFrom, priceTo);
      }
      if (category) {
        queryBuilder.filterTerm('category', category);
      }

      const query = queryBuilder.build();
      const searchResults = await this.indexingService.search(query);

      res.json(searchResults);
    } catch (error) {
      console.error('Error handling search request:', error);
      res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
  }

  getRouter() {
    return this.router;
  }
}

module.exports = SearchMiddleware;
