import request from 'supertest';
import { server } from '../../..';
import { prisma } from '../../../shared';
import { createUser } from './create-user';

describe('GET user by id', () => {
	beforeEach(async () => {
		await prisma.user.deleteMany();
	});
	it(`
        GIVEN a user does not exist
        WHEN I send a GET request to /users/:id
        THEN I should receive a 404 status code
    `, async () => {
		const response = await request(server).get('/users/userId123');
		expect(response.status).toBe(404);
	});
	it(`
        GIVEN a user exists
        WHEN I send a GET request to /users/:id
        THEN I should receive the user
    `, async () => {
		const user = await createUser({ name: 'John Doe', email: 'john@test.com' });
		const response = await request(server).get(
			`/users/userId/${user.body.data.id}`,
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			id: user.body.data.id,
			name: 'John Doe',
			email: 'john@test.com',
		});
	});
});
