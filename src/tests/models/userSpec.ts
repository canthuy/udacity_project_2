import { UserStore } from '../../models/user';

const userStore = new UserStore();

describe('User Model', () => {
  it('get all users', () => {
    expect(userStore.index).toBeDefined();
  });

  it('get user by id', () => {
    expect(userStore.show).toBeDefined();
  });

  it('create user', () => {
    expect(userStore.create).toBeDefined();
  });

  it('create user test', async () => {
    const result = await userStore.create({
      firstName: 'Thuy',
      lastName: 'Can',
      password: '123',
    });
    expect(result.firstName).toEqual('Thuy');
  });

  it('get all users test', async () => {
    const result = await userStore.index();
    expect(result.length).toBeGreaterThan(0);
  });

  it('get user by id test', async () => {
    const result = await userStore.show(1);
    expect(result).toBeTruthy();
  });
});
