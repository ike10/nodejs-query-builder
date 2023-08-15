const QueryBuilder = require('../src/queryBuilder'); // Adjust the path as needed

// Create a query builder instance
const queryBuilder = new QueryBuilder();

// Build a query with multiple conditions
const query = queryBuilder
  .must({ term: { category: 'Electronics' } })
  .filter({ range: { price: { gte: 100, lte: 500 } } })
  .searchQuery('smartphone')
  .build();

console.log('Built Query:', JSON.stringify(query, null, 2));
