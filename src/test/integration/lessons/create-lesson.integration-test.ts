import request from 'supertest';
import { prisma } from '../../../shared';
import { server } from '../../..';
import { createCourse } from '../courses/create-courses';
import { createModule } from '../modules/create-module';

describe('CREATE lesson', () => {
	beforeEach(async () => {
		await prisma.lesson.deleteMany();
		await prisma.module.deleteMany();
		await prisma.course.deleteMany();
	});

	it(`
        GIVEN a lesson with a title and a moduleId which not exists
        WHEN I send a POST request to /lessons
        THEN I should receive a 501 status code
    `, async () => {
		const response = await request(server)
			.post('/lessons')
			.send({ title: 'Math', moduleId: 'moduleId123' });

		expect(response.status).toBe(501);
	});

	it(`
        GIVEN a lesson with a title and a moduleId which exists
        WHEN I send a POST request to /lessons
        THEN I should receive the lesson
    `, async () => {
		const course = await createCourse({ title: 'Math' });
		const module = await createModule({
			title: 'Module 1',
			isRootModule: true,
			moduleId: null,
			courseId: course.body.data.id,
		});

		const response = await request(server)
			.post('/lessons')
			.send({ title: 'Math', moduleId: module.body.data.id });

		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			message: 'Lesson created successfully',
			data: {
				id: expect.any(String),
				title: 'Math',
				moduleId: module.body.data.id,
				isCompleted: false,
			},
		});
	});
});
