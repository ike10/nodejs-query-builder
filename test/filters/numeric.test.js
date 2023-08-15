// test/filters/numeric.test.js

const NumericFilter = require('../../src/filters/numeric'); // Adjust the path as needed

describe('NumericFilter', () => {
  let numericFilter;

  beforeEach(() => {
    numericFilter = new NumericFilter();
  });

  describe('range', () => {
    it('should add a numeric range filter', () => {
      numericFilter.range('price', 100, 200);
      expect(numericFilter.build()).toEqual({
        range: {
          price: {
            gte: 100,
            lte: 200,
          },
        },
      });
    });
  });

  describe('greaterThan', () => {
    it('should add a greater-than filter', () => {
      numericFilter.greaterThan('quantity', 10);
      expect(numericFilter.build()).toEqual({
        range: {
          quantity: {
            gt: 10,
          },
        },
      });
    });
  });

  describe('lessThan', () => {
    it('should add a less-than filter', () => {
      numericFilter.lessThan('rating', 4.5);
      expect(numericFilter.build()).toEqual({
        range: {
          rating: {
            lt: 4.5,
          },
        },
      });
    });
  });

  describe('build', () => {
    it('should return the final numeric filter object', () => {
      const filter = numericFilter.range('price', 100, 200).build();
      expect(filter).toEqual({
        range: {
          price: {
            gte: 100,
            lte: 200,
          },
        },
      });
    });
  });
});
