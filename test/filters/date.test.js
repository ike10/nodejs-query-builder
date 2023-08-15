// test/filters/date.test.js

const DateFilter = require('../../src/filters/date'); // Adjust the path as needed

describe('DateFilter', () => {
  let dateFilter;

  beforeEach(() => {
    dateFilter = new DateFilter();
  });

  describe('range', () => {
    it('should add a date range filter', () => {
      dateFilter.range('dateField', '2023-01-01', '2023-12-31');
      expect(dateFilter.build()).toEqual({
        range: {
          dateField: {
            gte: '2023-01-01',
            lte: '2023-12-31',
          },
        },
      });
    });
  });

  describe('build', () => {
    it('should return the final date filter object', () => {
      const filter = dateFilter.range('dateField', '2023-01-01', '2023-12-31').build();
      expect(filter).toEqual({
        range: {
          dateField: {
            gte: '2023-01-01',
            lte: '2023-12-31',
          },
        },
      });
    });
  });
});
