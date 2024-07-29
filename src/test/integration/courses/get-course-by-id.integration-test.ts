import request from 'supertest';
import { createCourse } from './create-courses';
import { server } from '../../..';
import { prisma } from '../../../shared';

describe('GET course by id', () => {
	beforeEach(async () => {
		await prisma.course.deleteMany();
	});

	it(`
		GIVEN a course with a title
		WHEN I send a GET course by id request with the id of the course
		THEN I should receive the course 
	`, async () => {
		const courseResponse = await createCourse({ title: 'Math' });
		const courseId = courseResponse.body.data.id;

		const response = await request(server).get(`/courses/courseId/${courseId}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			id: courseId,
			title: 'Math',
			statistics: {
				completedLessons: 0,
				percentage: 0,
				totalLessons: 0,
			},
		});
	});
});
