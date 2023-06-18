import supertest from 'supertest';
import { User, UserStore } from '../../models/user';
import app from '../../server';

const request = supertest(app);
const token: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOm51bGwsImxhc3RuYW1lIjpudWxsLCJwYXNzd29yZCI6bnVsbCwiaWQiOjEsImlhdCI6MTY4Njg0MzY5Nn0.Ho4CerGMR4Ob_ys2EM_PirACVTtxHrJ9kKKzduZb4Cs';

describe('Test user endpoint responses', () => {
  beforeAll(() => {
    spyOn(UserStore.prototype, 'create').and.returnValue(
      Promise.resolve({
        id: 1,
        firstName: 'Thuy',
        lastName: 'Can',
        password: '12345',
      } as unknown as User)
    );
    spyOn(UserStore.prototype, 'index').and.returnValue(
      Promise.resolve([
        {
          id: 1,
          firstName: 'Thuy',
          lastName: 'Can',
          password: '12345',
        },
        {
          id: 2,
          firstName: 'Hoa',
          lastName: 'Nguyen',
          password: '12345',
        },
      ] as unknown as User[])
    );
    spyOn(UserStore.prototype, 'show').and.returnValue(
      Promise.resolve({
        id: 1,
        firstName: 'Thuy',
        lastName: 'Can',
        password: '12345',
      } as unknown as User)
    );
  });

  it('create user: /user', (done) => {
    request.post('/user').then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        id: 1,
        firstName: 'Thuy',
        lastName: 'Can',
        password: '12345',
      });
    });

    done();
  });
  it('get user by id: /user/1', (done) => {
    request
      .get('/user/1')
      .set('Authorization', 'Bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          id: 1,
          firstName: 'Thuy',
          lastName: 'Can',
          password: '12345',
        });
      });

    done();
  });
  it('get users: /users', (done) => {
    request
      .get('/users')
      .set('Authorization', 'Bearer ' + token)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual([
          {
            id: 1,
            firstName: 'Thuy',
            lastName: 'Can',
            password: '12345',
          },
          {
            id: 2,
            firstName: 'Hoa',
            lastName: 'Nguyen',
            password: '12345',
          },
        ]);
      });

    done();
  });
});
