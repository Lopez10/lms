import request from 'supertest';
import { prisma } from '../../../shared';
import { server } from '../../..';

describe('CREATE user', () => {
	beforeEach(async () => {
		await prisma.user.deleteMany();
	});
	it(`
        GIVEN a user with a name and an email
        WHEN I send a POST request to /users
        THEN I should receive the user
    `, async () => {
		const response = await request(server)
			.post('/users')
			.send({ name: 'John Doe', email: 'john@test.com' });

		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			message: 'User created successfully',
			data: {
				id: expect.any(String),
				name: 'John Doe',
				email: 'john@test.com',
			},
		});
	});
});
