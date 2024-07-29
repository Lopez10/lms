import request from 'supertest';
import { prisma } from '../../../shared';
import { server } from '../../..';
import { createCourse } from './create-courses';

describe('GET courses', () => {
	beforeEach(async () => {
		await prisma.course.deleteMany();
	});

	it(`
		GIVEN no courses
		WHEN I send a GET request to /courses
		THEN I should receive an empty array	
	`, async () => {
		const response = await request(server).get('/courses');

		expect(response.status).toBe(200);
		expect(response.body).toEqual([]);
	});

	it(`
		GIVEN a course
		WHEN I send a GET request to /courses
		THEN I should receive an array with one course
	`, async () => {
		await createCourse({ title: 'Math' });

		const response = await request(server).get('/courses');

		expect(response.status).toBe(200);
		expect(response.body[0]).toHaveProperty('title', 'Math');
	});
});
