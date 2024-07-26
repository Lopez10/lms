import { GetCourseByIdUseCase } from '../../../modules/courses/application/get-course-by-id.use-case';
import { CourseInMemoryRepository } from '../../../modules/courses/infrastructure/course.in-memory.repository';
import { NotFoundException } from '../../../shared/application/exceptions';
import { CourseMother } from './course.mother';

describe('get course by id use case', () => {
	it(`
        GIVEN there is a course id inserted in the repository
        WHEN I get a course by id
        THEN the course is returned successfully
    `, async () => {
		const courseRepository = new CourseInMemoryRepository();
		const getCourseById = new GetCourseByIdUseCase(courseRepository);

		// GIVEN
		const id = 'courseId123';
		courseRepository.insert(CourseMother.create({ id }));

		// WHEN
		const course = await getCourseById.run(id);

		// THEN
		expect(course).toBeDefined();
		expect(course.id).toBeDefined();
		expect(course.id.value).toBe(id);
	});

	it(`
        GIVEN there is no course id inserted in the repository
        WHEN I get a course by id
        THEN a not found exception is thrown
    `, async () => {
		const courseRepository = new CourseInMemoryRepository();
		const getCourseById = new GetCourseByIdUseCase(courseRepository);

		// GIVEN
		const id = 'courseId123';

		expect.assertions(1);

		try {
			// WHEN
			await getCourseById.run(id);
		} catch (error) {
			// THEN
			expect(error).toBeInstanceOf(NotFoundException);
		}
	});
});
