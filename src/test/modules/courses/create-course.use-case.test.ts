import { CreateCourseUseCase } from '../../../modules/courses/application/create-course.use-case';
import { CourseInMemoryRepository } from '../../../modules/courses/infrastructure/course.in-memory.repository';

describe('create course use case', () => {
	it(`
        GIVEN there is a title
        WHEN I create a course
        THEN the course is created successfully
    `, async () => {
		const courseRepository = new CourseInMemoryRepository();
		const createCourse = new CreateCourseUseCase(courseRepository);

		// GIVEN
		const title = 'course title';

		// WHEN
		const course = await createCourse.run({ title });

		// THEN
		expect(course).toBeDefined();
		expect(course.id).toBeDefined();
		expect(course.props.title).toBe(title);
	});
});
