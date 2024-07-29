import request from 'supertest';
import { prisma } from '../../shared';
import apiService, { server } from '../..';

afterAll(async () => {
	await prisma.$disconnect();
	server.close();
});

describe('IT | Courses', () => {
	describe('GET /courses', () => {
		it('should return a list of courses', async () => {
			const response = await request(apiService).get('/courses');

			expect(response.status).toBe(501);
			expect(response.body).toEqual({ message: 'Method not implemented' });
		});
	});
});
