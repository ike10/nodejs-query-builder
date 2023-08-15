// src/filters/date.js

class DateFilter {
  constructor() {
    this.filter = {
      range: {},
    };
  }

  // Add a date range filter
  range(field, from, to) {
    this.filter.range[field] = {
      gte: from,
      lte: to,
    };
    return this;
  }

  // Return the final date filter object
  build() {
    return this.filter;
  }
}

module.exports = DateFilter;
