import supertest from 'supertest';
import { Product, ProductStore } from '../../models/product';
import app from '../../server';

const request = supertest(app);
const token: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJwYXNzd29yZCI6bnVsbCwiaWQiOjEsImlhdCI6MTY4Njg0MzY5Nn0.Ho4CerGMR4Ob_ys2EM_PirACVTtxHrJ9kKKzduZb4Cs';

describe('Test product endpoint responses', () => {
  beforeAll(() => {
    spyOn(ProductStore.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        name: 'book',
        price: 10,
        category: 'category 1',
      } as unknown as Product)
    );
    spyOn(ProductStore.prototype, 'index').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          name: 'book',
          price: 10,
          category: 'category 1',
        },
        {
          id: 2,
          name: 'pen',
          price: 10,
          category: 'category 2',
        },
      ] as unknown as Product[])
    );
    spyOn(ProductStore.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: 3,
        name: 'book',
        price: 10,
        category: 'category 1',
      } as unknown as Product)
    );
  });

  it('create product: /product', (done) => {
    request.post('/product').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: 1,
        name: 'book',
        price: 10,
        category: 'category 1',
      });
    });

    done();
  });
  it('get product by id: /product/3', (done) => {
    request.get('/product/3').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: 3,
        name: 'book',
        price: 10,
        category: 'category 1',
      });
    });

    done();
  });
  it('get products: /products', (done) => {
    request.get('/products').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual([
        {
          id: 1,
          name: 'book',
          price: 10,
          category: 'category 1',
        },
        {
          id: 2,
          name: 'pen',
          price: 10,
          category: 'category 2',
        },
      ]);
    });

    done();
  });
});
