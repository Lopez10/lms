import { server } from '../../..';
import request from 'supertest';
import { prisma } from '../../../shared';
import { createCourse } from '../courses/create-courses';
import { createModule } from '../modules/create-module';
import { createLesson } from './create-lesson';

describe('GET lesson by id', () => {
	beforeEach(async () => {
		await prisma.lesson.deleteMany();
		await prisma.module.deleteMany();
		await prisma.course.deleteMany();
	});

	it(`
        GIVEN a lesson with an id which not exists
        WHEN I send a GET request to /lessons/:id
        THEN I should receive a 404 status code
    `, async () => {
		const response = await request(server).get('/lessons/lessonId123');

		expect(response.status).toBe(404);
	});

	it(`
        GIVEN a lesson with an id which exists
        WHEN I send a GET request to /lessons/:id
        THEN I should receive the lesson
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

		const response = await request(server).get(
			`/lessons/lessonId/${lesson.body.data.id}`,
		);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			id: lesson.body.data.id,
			title: 'Math',
			moduleId: module.body.data.id,
			isCompleted: false,
		});
	});
});
