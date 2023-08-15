// src/queryBuilder.js

class QueryBuilder {
  constructor() {
    this.query = {
      bool: {
        must: [],
        filter: [],
      },
    };
  }

  // Add a "must" clause to the query
  must(condition) {
    this.query.bool.must.push(condition);
    return this;
  }

  // Add a "filter" clause to the query
  filter(condition) {
    this.query.bool.filter.push(condition);
    return this;
  }

  // Add a full-text search query
  searchQuery(text) {
    this.must({
      match: {
        _all: text,
      },
    });
    return this;
  }

  // Add a numeric range filter
  numericRangeFilter(field, from, to) {
    this.filter({
      range: {
        [field]: {
          gte: from,
          lte: to,
        },
      },
    });
    return this;
  }

  // Add a term filter
  termFilter(field, value) {
    this.filter({
      term: {
        [field]: value,
      },
    });
    return this;
  }

  // Add more query and filter methods as needed

  // Return the final query object
  build() {
    return this.query;
  }
}

module.exports = QueryBuilder;
