// test/queryBuilder.test.js

const QueryBuilder = require('../src/queryBuilder'); // Adjust the path as needed

describe('QueryBuilder', () => {
  let queryBuilder;

  beforeEach(() => {
    queryBuilder = new QueryBuilder();
  });

  describe('must', () => {
    it('should add a must condition to the query', () => {
      queryBuilder.must({ term: { field: 'value' } });
      expect(queryBuilder.build()).toEqual({
        bool: {
          must: [{ term: { field: 'value' } }],
          filter: [],
        },
      });
    });
  });

  describe('filter', () => {
    it('should add a filter condition to the query', () => {
      queryBuilder.filter({ range: { price: { gte: 100 } } });
      expect(queryBuilder.build()).toEqual({
        bool: {
          must: [],
          filter: [{ range: { price: { gte: 100 } } }],
        },
      });
    });
  });

  describe('searchQuery', () => {
    it('should add a full-text search query', () => {
      queryBuilder.searchQuery('example');
      expect(queryBuilder.build()).toEqual({
        bool: {
          must: [{ match: { _all: 'example' } }],
          filter: [],
        },
      });
    });
  });

  // Add more test cases for other methods (numericRangeFilter, termFilter, etc.)

  describe('build', () => {
    it('should return the final query object', () => {
      const query = queryBuilder.must({ term: { field: 'value' } }).build();
      expect(query).toEqual({
        bool: {
          must: [{ term: { field: 'value' } }],
          filter: [],
        },
      });
    });
  });
});
