import request from 'supertest';
import { server } from '../../..';
import { prisma } from '../../../shared';
import { createCourse } from '../courses/create-courses';
import { createModule } from './create-module';

describe('GET modules', () => {
	beforeEach(async () => {
		await prisma.module.deleteMany();
		await prisma.course.deleteMany();
	});

	it(`
        GIVEN there are no modules
        WHEN I send a GET request to /modules
        THEN I should receive an empty array
    `, async () => {
		const response = await request(server).get('/modules');

		expect(response.body).toEqual([]);
	});

	it(`
        GIVEN there are modules
        WHEN I send a GET request to /modules
        THEN I should receive the modules
    `, async () => {
		const course = await createCourse({ title: 'Math' });
		const module = await createModule({
			title: 'Module 1',
			isRootModule: true,
			moduleId: null,
			courseId: course.body.data.id,
		});

		const response = await request(server).get('/modules');

		expect(response.status).toBe(200);
		expect(response.body).toEqual([
			{
				id: module.body.data.id,
				title: 'Module 1',
				courseId: course.body.data.id,
				isRootModule: true,
				moduleId: null,
			},
		]);
	});
});
