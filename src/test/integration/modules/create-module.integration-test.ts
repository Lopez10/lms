import request from 'supertest';
import { server } from '../../..';
import { prisma } from '../../../shared';
import { createCourse } from '../courses/create-courses';

describe('CREATE module', () => {
	beforeEach(async () => {
		await prisma.module.deleteMany();
		await prisma.course.deleteMany();
	});

	it(`
        GIVEN a module with a title and a courseId which not exists
        WHEN I send a POST request to /modules
        THEN I should receive a 400 status code
    `, async () => {
		const response = await request(server)
			.post('/modules')
			.send({ title: 'Module 1', courseId: 'courseId123' });

		expect(response.status).toBe(400);
	});

	it(`
        GIVEN a module with a title and a courseId which exists
        WHEN I send a POST request to /modules
        THEN I should receive the module
    `, async () => {
		const course = await createCourse({ title: 'Math' });

		const response = await request(server).post('/modules').send({
			title: 'Module 1',
			courseId: course.body.data.id,
			isRootModule: true,
			moduleId: null,
		});

		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			message: 'Module created successfully',
			data: {
				id: expect.any(String),
				title: 'Module 1',
				courseId: course.body.data.id,
				isRootModule: true,
				moduleId: null,
			},
		});
	});
});
