// src/indexing.js
const { Client } = require('@elastic/elasticsearch');

class IndexingService {
  constructor(config) {
    this.client = new Client(config);
    this.indexName = 'products'; // Modify to match your index name
  }

  async createIndex() {
    await this.client.indices.create({
      index: this.indexName,
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
  }

  async indexData(data) {
    const bulkBody = [];

    data.forEach((item) => {
      bulkBody.push({ index: { _index: this.indexName } });
      bulkBody.push(item);
    });

    await this.client.bulk({ body: bulkBody });
  }

  async search(query) {
    const response = await this.client.search({
      index: this.indexName,
      body: {
        query,
      },
    });

    return response.body.hits.hits.map((hit) => hit._source);
  }

  // Add more indexing methods as needed
}

module.exports = IndexingService;
