import request from 'supertest';
import { prisma } from '../../../shared';
import { server } from '../../..';

describe('CREATE course', () => {
	beforeEach(async () => {
		await prisma.course.deleteMany();
	});

	it(`
        GIVEN a course with a title
        WHEN I send a POST request to /courses
        THEN I should receive the course
    `, async () => {
		const response = await request(server)
			.post('/courses')
			.send({ title: 'Math' });

		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			message: 'Course created successfully',
			data: {
				id: expect.any(String),
				title: 'Math',
				statistics: {
					completedLessons: 0,
					percentage: 0,
					totalLessons: 0,
				},
			},
		});
	});
});
