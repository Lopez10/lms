import request from 'supertest';
import { server } from '../../..';
import { createCourse } from '../courses/create-courses';
import { createLesson } from '../lessons/create-lesson';
import { createModule } from '../modules/create-module';
import { createUser } from '../users/create-user';

describe('CREATE completion', () => {
	it(`
        GIVEN a completion with a userId and a lessonId
        WHEN I send a POST request to /completions
        THEN I should receive the completion
    `, async () => {
		const user = await createUser({ name: 'John Doe', email: 'john@test.com' });
		const course = await createCourse({ title: 'Math' });
		const module = await createModule({
			title: 'Module 1',
			isRootModule: true,
			moduleId: null,
			courseId: course.body.data.id,
		});
		const lesson = await createLesson({
			title: 'Lesson 1',
			moduleId: module.body.data.id,
		});

		console.log(user.body.data.id, lesson.body.data.id);

		const response = await request(server).post('/completions').send({
			userId: user.body.data.id,
			lessonId: lesson.body.data.id,
		});

		expect(response.status).toBe(201);
		expect(response.body).toEqual({
			message: 'Completion created successfully',
			data: {
				id: expect.any(String),
				userId: user.body.data.id,
				lessonId: lesson.body.data.id,
			},
		});
	});
});
