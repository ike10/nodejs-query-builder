// src/filters/numeric.js

class NumericFilter {
  constructor() {
    this.filter = {
      range: {},
    };
  }

  // Add a numeric range filter
  range(field, from, to) {
    this.filter.range[field] = {
      gte: from,
      lte: to,
    };
    return this;
  }

  // Add a greater-than filter
  greaterThan(field, value) {
    this.filter.range[field] = {
      gt: value,
    };
    return this;
  }

  // Add a less-than filter
  lessThan(field, value) {
    this.filter.range[field] = {
      lt: value,
    };
    return this;
  }

  // Return the final numeric filter object
  build() {
    return this.filter;
  }
}

module.exports = NumericFilter;
