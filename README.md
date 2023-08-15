# Node.js Search and Filtering Utility Library

A production-grade search and filtering utility library for Node.js, designed to simplify the process of building search functionalities with Elasticsearch integration. This library provides a flexible query builder, date and numeric filters, and an Express.js middleware for easy integration into web applications.

## Features

- **Query Builder**: Build complex query objects using a user-friendly API.
- **Date Filtering**: Create date range filters for precise searches.
- **Numeric Filtering**: Add numeric range filters for filtering by price, quantity, ratings, etc.
- **Express.js Middleware**: Easily integrate the library into your Express.js application.

## Installation

```bash
npm install --save nodejs-search-library
```

## Usage
### Query Builder

```javascript
const { QueryBuilder } = require('nodejs-search-library');

const queryBuilder = new QueryBuilder();
const query = queryBuilder
  .must({ term: { category: 'Electronics' } })
  .filter({ range: { price: { gte: 100, lte: 500 } } })
  .searchQuery('smartphone')
  .build();

console.log('Built Query:', JSON.stringify(query, null, 2));
```

### Express.js Integration
```javascript 
const express = require('express');
const { IndexingService, DateFilter, NumericFilter, SearchMiddleware } = require('nodejs-search-library');

const app = express();

const indexingService = new IndexingService({
  node: 'http://localhost:9200', // Elasticsearch node URL
});

const dateFilter = new DateFilter();
const numericFilter = new NumericFilter();

dateFilter.range('dateField', '2023-01-01', '2023-12-31');
numericFilter.range('price', 100, 500);

const query = {
  bool: {
    must: [],
    filter: [dateFilter.build(), numericFilter.build()],
  },
};

const searchMiddleware = new SearchMiddleware(indexingService);
searchMiddleware.setupRoutes();

app.use('/api', searchMiddleware.getRouter());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
});
```

## API Documentation
- Query Builder
- Date Filter
- Numeric Filter
- Indexing Service
- Search Middleware

## Contributing

Contributions to tis project are welcomed! If you'd like to contribute, follow these steps

1. Fork the repository
2. Clone your forked repository to your local machine.
3. Create a new branch for your changes:
```bash
git checkout -b feature/your-feature-name
```
4. Make your changes and commit them:
```bash
git add .
git commit -m "Add your commit message here"
```
5. Push your changes to your forked repository:
```bash
git push origin feature/your-feature-name
```
6. Create a pull request form your branch to the main repository's 'main' branch.

Feel free to open an issue to discuss new features or improvements before starting to code.

## License
This project is licensed under the MIT License.


