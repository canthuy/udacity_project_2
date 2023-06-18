import { ProductStore } from '../../models/product';

const productStore = new ProductStore();

describe('Product Model', () => {
  it('get all products', () => {
    expect(productStore.index).toBeDefined();
  });

  it('get product by id', () => {
    expect(productStore.show).toBeDefined();
  });

  it('create product', () => {
    expect(productStore.create).toBeDefined();
  });
});
