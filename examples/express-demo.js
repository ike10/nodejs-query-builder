const express = require('express');
const IndexingService = require('../src/indexing'); // Adjust the path as needed
const DateFilter = require('../src/filters/date'); // Adjust the path as needed
const NumericFilter = require('../src/filters/numeric'); // Adjust the path as needed
const SearchMiddleware = require('../middleware/express'); // Adjust the path as needed

// Create an instance of the IndexingService (configure as needed)
const indexingService = new IndexingService({
  node: 'http://localhost:9200', // Elasticsearch node URL
});

// Create an instance of the DateFilter and NumericFilter classes
const dateFilter = new DateFilter();
const numericFilter = new NumericFilter();

// Add date range and numeric range filters
dateFilter.range('dateField', '2023-01-01', '2023-12-31');
numericFilter.range('price', 100, 500);

// Create a query using the QueryBuilder and filters
const query = {
  bool: {
    must: [],
    filter: [dateFilter.build(), numericFilter.build()],
  },
};

// Search using the IndexingService
async function performSearch() {
  try {
    const searchResults = await indexingService.search(query);
    console.log('Search Results:', searchResults);
  } catch (error) {
    console.error('Error performing search:', error);
  }
}

performSearch();

// Set up an Express app and middleware
const app = express();

const searchMiddleware = new SearchMiddleware(indexingService);
searchMiddleware.setupRoutes();

app.use('/api', searchMiddleware.getRouter());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
