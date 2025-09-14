import { createRandomUser } from '../seeds/user.seed';
import {unAuthedTestClient, authedTestClient} from '../../../tests/helper/supertest.helper';
import { extractFields, removeFields } from '../../../utils/object.util';
import { User } from '../user.entity';
import { UserRepository } from '../user.repository';
describe('userEndpoints', () => {
it('GET /api/v1/users with unauthed agent will throw error', async () => {
    const response = await unAuthedTestClient.get('/api/v1/users');
    expect(response.status).toBe(401);
  });

  it("GET /users should return array of users", async () => {
    const response = await authedTestClient.get('/users');

    expect(response.statusCode).toBe(200);
    // expect(response.body).toEqual({
    //   success: true,
    //   data: (await userData).map((user) => ({
    //     ...user,
    //    createdAt: user.createdAt.toISOString(),
    // })),
      expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: expect.any(Array)
  });
  });
  it('POST /api/v1/users should Create user and return user and its saved to DB  ', async () => {
    const newUserSeeds = extractFields(createRandomUser(), [
      'name',
      'password',
      'email'
    ]);
    const response = await authedTestClient
      .post('/api/v1/users')
      .send(newUserSeeds);
    // check the response
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining<Partial<User>>({
        name: newUserSeeds.name,
        email: newUserSeeds.email
      })
    });

    expect(response.status).toBe(201);
    // check that user saved in db
    const userRepository = new UserRepository();
    const createdUser = userRepository.findByEmail(newUserSeeds.email);

    expect(createdUser).toBeDefined();//exist or not 
    expect(Object.keys(createdUser!).length).toBeGreaterThanOrEqual(6);
  });
});