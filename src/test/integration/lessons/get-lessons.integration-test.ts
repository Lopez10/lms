import request from 'supertest';
import { server } from '../../..';
import { prisma } from '../../../shared';
import { createCourse } from '../courses/create-courses';
import { createModule } from '../modules/create-module';
import { createLesson } from './create-lesson';

describe('GET lessons', () => {
	beforeEach(async () => {
		await prisma.lesson.deleteMany();
		await prisma.module.deleteMany();
		await prisma.course.deleteMany();
	});

	it(`
        GIVEN there are no lessons
        WHEN I send a GET request to /lessons
        THEN I should receive an empty array
    `, async () => {
		const response = await request(server).get('/lessons');

		expect(response.body).toEqual([]);
	});

	it(`
        GIVEN there are lessons
        WHEN I send a GET request to /lessons
        THEN I should receive the lessons
    `, async () => {
		const course = await createCourse({ title: 'Math' });
		const module = await createModule({
			title: 'Module 1',
			isRootModule: true,
			moduleId: null,
			courseId: course.body.data.id,
		});

		const lesson = await createLesson({
			title: 'Math',
			moduleId: module.body.data.id,
		});

		const response = await request(server).get('/lessons');

		expect(response.status).toBe(200);
		expect(response.body).toEqual([
			{
				id: lesson.body.data.id,
				title: 'Math',
				moduleId: module.body.data.id,
				isCompleted: false,
			},
		]);
	});
});
