import supertest from 'supertest';
import { Order, OrderStore } from '../../models/order';
import app from '../../server';

const request = supertest(app);
const token: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJwYXNzd29yZCI6bnVsbCwiaWQiOjEsImlhdCI6MTY4Njg0MzY5Nn0.Ho4CerGMR4Ob_ys2EM_PirACVTtxHrJ9kKKzduZb4Cs';

describe('Test order endpoint responses', () => {
  beforeAll(() => {
    spyOn(OrderStore.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        product_id: 10,
        quantity: 2,
        user_id: 1,
        status: 'active',
      } as unknown as Order)
    );
    spyOn(OrderStore.prototype, 'getCurrentOrderByUser').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          product_id: 2,
          quantity: 1,
          user_id: 1,
          status: 'active',
        },
        {
          id: 2,
          product_id: 10,
          quantity: 10,
          user_id: 1,
          status: 'active',
        },
      ] as unknown as Order[])
    );
    spyOn(OrderStore.prototype, 'getOrderByUser').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          product_id: 2,
          quantity: 1,
          user_id: 1,
          status: 'complete',
        },
        {
          id: 2,
          product_id: 10,
          quantity: 10,
          user_id: 1,
          status: 'active',
        },
      ] as unknown as Order[])
    );
    spyOn(OrderStore.prototype, 'getOrderCompleteByUser').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          product_id: 2,
          quantity: 1,
          user_id: 1,
          status: 'complete',
        },
        {
          id: 2,
          product_id: 10,
          quantity: 10,
          user_id: 1,
          status: 'complete',
        },
      ] as unknown as Order[])
    );
    spyOn(OrderStore.prototype, 'getOrderActiveByUser').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          product_id: 2,
          quantity: 1,
          user_id: 1,
          status: 'active',
        },
        {
          id: 2,
          product_id: 10,
          quantity: 10,
          user_id: 1,
          status: 'active',
        },
      ] as unknown as Order[])
    );
  });

  it('create order: /order', (done) => {
    request
      .post('/order')
      .set('Authorization', 'Bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          id: 1,
          product_id: 10,
          quantity: 2,
          user_id: 1,
          status: 'active',
        });
      });

    done();
  });
  it('get order by user id: /order/1', (done) => {
    request
      .get('/order/1')
      .set('Authorization', 'Bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
          {
            id: 1,
            product_id: 2,
            quantity: 1,
            user_id: 1,
            status: 'complete',
          },
          {
            id: 2,
            product_id: 10,
            quantity: 10,
            user_id: 1,
            status: 'active',
          },
        ]);
      });

    done();
  });
  it('get current order by user id: /order/current/1', (done) => {
    request
      .get('/order/current/1')
      .set('Authorization', 'Bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
          {
            id: 1,
            product_id: 2,
            quantity: 1,
            user_id: 1,
            status: 'active',
          },
          {
            id: 2,
            product_id: 10,
            quantity: 10,
            user_id: 1,
            status: 'active',
          },
        ]);
      });

    done();
  });
  it('get complete order by user id: /order/complete/1', (done) => {
    request
      .get('/order/complete/1')
      .set('Authorization', 'Bearer ' + token)
      .then((res) => {
        console.log(res);

        expect(res.status).toBe(200);
        expect(res.body).toEqual([
          {
            id: 1,
            product_id: 2,
            quantity: 1,
            user_id: 1,
            status: 'complete',
          },
          {
            id: 2,
            product_id: 10,
            quantity: 10,
            user_id: 1,
            status: 'complete',
          },
        ]);
      });

    done();
  });
  it('get active order by user id: /order/active/1', (done) => {
    request
      .get('/order/active/1')
      .set('Authorization', 'Bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
          {
            id: 1,
            product_id: 2,
            quantity: 1,
            user_id: 1,
            status: 'active',
          },
          {
            id: 2,
            product_id: 10,
            quantity: 10,
            user_id: 1,
            status: 'active',
          },
        ]);
      });

    done();
  });
});
