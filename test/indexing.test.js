// test/indexing.test.js

const IndexingService = require('../src/indexing'); // Adjust the path as needed

describe('IndexingService', () => {
  let indexingService;

  beforeEach(() => {
    const elasticsearchConfig = {
      node: 'http://localhost:9200', // Replace with your Elasticsearch node URL
    };
    indexingService = new IndexingService(elasticsearchConfig);
  });

  describe('createIndex', () => {
    it('should create an index with correct mappings', async () => {
      // Mock Elasticsearch create index function
      const createIndexMock = jest.fn();
      indexingService.client.indices.create = createIndexMock;

      await indexingService.createIndex();

      expect(createIndexMock).toHaveBeenCalledWith({
        index: 'products',
        body: {
          mappings: {
            properties: {
              id: { type: 'integer' },
              name: { type: 'text' },
              price: { type: 'float' },
              category: { type: 'keyword' },
              // Add more fields here
            },
          },
        },
      });
    });
  });

  describe('indexData', () => {
    it('should bulk index data', async () => {
      // Mock Elasticsearch bulk function
      const bulkMock = jest.fn();
      indexingService.client.bulk = bulkMock;

      const testData = [
        { id: 1, name: 'Product A', price: 100, category: 'Electronics' },
        { id: 2, name: 'Product B', price: 200, category: 'Clothing' },
      ];

      await indexingService.indexData(testData);

      expect(bulkMock).toHaveBeenCalledWith({
        body: [
          { index: { _index: 'products' } },
          { id: 1, name: 'Product A', price: 100, category: 'Electronics' },
          { index: { _index: 'products' } },
          { id: 2, name: 'Product B', price: 200, category: 'Clothing' },
        ],
      });
    });
  });

  // Add more tests for other methods in IndexingService

  describe('search', () => {
    it('should perform a search and return results', async () => {
      // Mock Elasticsearch search function
      const searchMock = jest.fn().mockResolvedValue({
        body: {
          hits: {
            hits: [
              { _source: { name: 'Product A' } },
              { _source: { name: 'Product B' } },
            ],
          },
        },
      });
      indexingService.client.search = searchMock;

      const query = { bool: { must: [], filter: [] } };
      const results = await indexingService.search(query);

      expect(results).toEqual([{ name: 'Product A' }, { name: 'Product B' }]);
    });
  });
});
