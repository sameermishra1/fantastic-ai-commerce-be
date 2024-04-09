import request from 'supertest';
import express from 'express';
import { getProductById, transformProductData } from '../productController';
import { ProductData } from '../../models/ProductData';
import e from 'express';

// read productData.json file and create the mock response
const mockProduct = require('./productData.json');
// Mock the API root
jest.mock('../../builders/commercetoolsBuilder', () => ({
  apiRoot: {
    products: () => ({
      withId: () => ({
        get: () => ({
          execute: () => Promise.resolve({ body: mockProduct }),
        }),
      }),
    }),
  },
}));

describe('getProductById', () => {
  it('should return transformed product data', async () => {
    const app = express();
    app.get('/product/:id', getProductById);

    const res = await request(app).get('/product/1?locale=en-GB&country=GB');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toEqual('35b0fe9e-c3ce-4905-b0bf-e933d58e8874');
    expect(res.body).toHaveProperty('key');
    expect(res.body).toHaveProperty('masterData');
    expect(res.body).toHaveProperty('masterData.current');
    expect(res.body).toHaveProperty('masterData.current.name');
  });

  it('should handle errors', async () => {
    const app = express();
    app.get('/product/:id', (req, res) => {
    // send empty id to test error handling
    req.params.id = '';
      getProductById(req, res);
    });
    const res = await request(app).get('/product/invalid');
    expect(res.statusCode).toEqual(400);
  });
});

describe('transformProductData', () => {
  it('should transform product data based on locale and country', () => {
    const id = '123';
    const locale = 'en-GB';
    const country = 'US';

    const transformedProductData = transformProductData(mockProduct, id, locale, country);

    const expectedProductData = new ProductData();
    expectedProductData.id = '35b0fe9e-c3ce-4905-b0bf-e933d58e8874';
    // Fill this with the expected transformed product data
    expect(transformedProductData.id).toEqual(expectedProductData.id);
  });
});