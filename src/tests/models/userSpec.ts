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
});
