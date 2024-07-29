import request from 'supertest';
import { server } from '../../..';
import { prisma } from '../../../shared';
import { createCourse } from '../courses/create-courses';
import { createModule } from './create-module';

describe('GET module by id', () => {
	beforeEach(async () => {
		await prisma.module.deleteMany();
		await prisma.course.deleteMany();
	});

	it(`
        GIVEN a module does not exist
        WHEN I send a GET request to /modules/:id
        THEN I should receive a 404 status code
    `, async () => {
		const response = await request(server).get('/modules/moduleId123');
		expect(response.status).toBe(404);
	});
	it(`
        GIVEN a module exists
        WHEN I send a GET request to /modules/:id
        THEN I should receive the module
    `, async () => {
		const course = await createCourse({ title: 'Math' });
		const module = await createModule({
			title: 'Module 1',
			isRootModule: true,
			moduleId: null,
			courseId: course.body.data.id,
		});
		const response = await request(server).get(
			`/modules/moduleId/${module.body.data.id}`,
		);
		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			id: module.body.data.id,
			title: 'Module 1',
			courseId: course.body.data.id,
			isRootModule: true,
			moduleId: null,
		});
	});
});
