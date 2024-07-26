import { GetCoursesUseCase } from '../../../modules/courses/application/get-courses.use-case';
import { CourseInMemoryRepository } from '../../../modules/courses/infrastructure/course.in-memory.repository';
import { CourseMother } from './course.mother';

describe('get courses use case', () => {
	it(`
        GIVEN there are courses inserted in the repository
        WHEN I get all courses
        THEN the courses are returned successfully
    `, async () => {
		const courseRepository = new CourseInMemoryRepository();
		const getCourses = new GetCoursesUseCase(courseRepository);
		const id1 = 'courseId123';
		const id2 = 'courseId223';

		// GIVEN
		const course1 = CourseMother.create({ id: id1 });
		const course2 = CourseMother.create({ id: id2 });
		courseRepository.insert(course1);
		courseRepository.insert(course2);

		// WHEN
		const courses = await getCourses.run();

		// THEN
		expect(courses).toHaveLength(2);
		expect(courses[0].id).toBeDefined();
		expect(courses[0].id.value).toBe(id1);
		expect(courses[1].id).toBeDefined();
		expect(courses[1].id.value).toBe(id2);
	});
	it(`
        GIVEN there are no courses inserted in the repository
        WHEN I get all courses
        THEN an empty array is returned
    `, async () => {
		const courseRepository = new CourseInMemoryRepository();
		const getCourses = new GetCoursesUseCase(courseRepository);
		// GIVEN

		// WHEN
		const courses = await getCourses.run();

		// THEN
		expect(courses).toHaveLength(0);
	});
});
