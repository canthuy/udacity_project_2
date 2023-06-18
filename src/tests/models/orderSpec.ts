import { OrderStore } from '../../models/order';

const orderStore = new OrderStore();

describe('Product Model', () => {
  it('get orders by user id', () => {
    expect(orderStore.getOrderByUser).toBeDefined();
  });

  it('get orders complete by user id', () => {
    expect(orderStore.getOrderCompleteByUser).toBeDefined();
  });

  it('create new order', () => {
    expect(orderStore.create).toBeDefined();
  });
  it('get order active by user', () => {
    expect(orderStore.getOrderActiveByUser).toBeDefined();
  });
  it('get current orders by user', () => {
    expect(orderStore.getCurrentOrderByUser).toBeDefined();
  });
});
