import { CompletionInMemoryRepository } from '../../../../modules/completions/infrastructure/completion.in-memory';
import { CourseService } from '../../../../modules/courses/domain/course.service';
import { LessonInMemoryRepository } from '../../lessons/infrastructure/lesson.in-memory.repository';
import { Id } from '../../../../shared';
import { CompletionMother } from '../../completions/completion.mother';
import { LessonMother } from '../../lessons/lesson.mother';
import { ModuleMother } from '../../modules/module.mother';

describe('course service', () => {
	it(`
        GIVEN there is a course with a single module and a single lesson
        WHEN the service is called to get the total lessons of the course
        THEN I receive all the lessons of the course
    `, async () => {
		const completionRepository = new CompletionInMemoryRepository();
		const lessonRepository = new LessonInMemoryRepository();

		const service = new CourseService(completionRepository, lessonRepository);

		const courseId = 'courseId123';

		// GIVEN
		createCourseModuleExample(courseId, completionRepository, lessonRepository);

		// WHEN
		const totalLessonsCount = await service.getTotalLessonsCount(
			Id.createExisted(courseId),
		);

		// THEN
		expect(totalLessonsCount).toBe(1);
	});

	it(`
		GIVEN there is a course with a single module and a single lesson
		AND the lesson is completed by a user
		WHEN the service is called to get the completed lessons of the course
		THEN I receive all the lessons of the course
	`, async () => {
		const completionRepository = new CompletionInMemoryRepository();
		const lessonRepository = new LessonInMemoryRepository();

		const service = new CourseService(completionRepository, lessonRepository);

		const courseId = 'courseId123';

		// GIVEN
		createCourseModuleExample(courseId, completionRepository, lessonRepository);

		// AND
		completionRepository.insert(
			CompletionMother.create({
				lessonId: 'lessonId123',
				userId: 'userId12345',
			}),
		);

		// WHEN
		const completedLessons = await service.getCompletedLessonsCount(
			Id.createExisted(courseId),
		);

		// THEN
		expect(completedLessons).toBe(1);
	});

	it(`
		GIVEN there is a course with a single module and a single lesson
		AND the lesson is completed by a user
		WHEN the service is called to get the progress of the course
		THEN I receive the progress of the course
	`, async () => {
		const completionRepository = new CompletionInMemoryRepository();
		const lessonRepository = new LessonInMemoryRepository();

		const service = new CourseService(completionRepository, lessonRepository);

		const courseId = 'courseId123';

		// GIVEN
		createCourseModuleExample(courseId, completionRepository, lessonRepository);

		// AND
		completionRepository.insert(
			CompletionMother.create({
				lessonId: 'lessonId123',
				userId: 'userId12345',
			}),
		);

		// WHEN
		const progress = await service.getCourseProgress(
			Id.createExisted(courseId),
		);

		// THEN
		expect(progress).toBe(100);
	});
});
function createCourseModuleExample(
	courseId: string,
	completionRepository: CompletionInMemoryRepository,
	lessonRepository: LessonInMemoryRepository,
) {
	const moduleExample = ModuleMother.create({
		courseId,
		id: 'moduleId123',
		moduleId: 'moduleId123',
		title: 'module title',
	});
	const lessonExample = LessonMother.create({
		id: 'lessonId123',
		moduleId: 'moduleId123',
		name: 'lesson name',
	});

	completionRepository.insertModule(moduleExample);
	lessonRepository.insertModule(moduleExample);

	completionRepository.insertLesson(lessonExample);
	lessonRepository.insert(lessonExample);
}
