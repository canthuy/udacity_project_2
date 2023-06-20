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

  it('create order test', async () => {
    const result = await orderStore.create({
      productId: 1,
      quantity: 1,
      status: 'active',
      userId: 1,
    });
    expect(result.productId).toEqual(1);
  });

  it('getCurrentOrderByUser test', async () => {
    const result = await orderStore.getCurrentOrderByUser(1);
    expect(result.length).toBeGreaterThan(0);
  });

  it('getOrderCompleteByUser test', async () => {
    const result = await orderStore.getOrderCompleteByUser(1);
    expect(result.length).toEqual(0);
  });

  it('getOrderActiveByUser test', async () => {
    const result = await orderStore.getOrderActiveByUser(1);
    expect(result.length).toBeGreaterThan(0);
  });

  it('getOrderActiveByUser test', async () => {
    const result = await orderStore.getOrderByUser(1);
    expect(result.length).toBeGreaterThan(0);
  });
});
