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

  it('create product test', async () => {
    const result = await productStore.create({
      name: 'book',
      category: 'category 1',
      price: 1000,
    });
    expect(result.name).toEqual('book');
  });

  it('get all products test', async () => {
    const result = await productStore.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('get product by id test', async () => {
    const result = await productStore.show(1);
    expect(result).toBeTruthy();
  });
});
