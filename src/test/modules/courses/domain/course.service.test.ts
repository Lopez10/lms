import { CompletionInMemoryRepository } from '../../../../modules/completions/infrastructure/completion.in-memory';
import { CourseService } from '../../../../modules/courses/domain/course.service';
import { LessonInMemoryRepository } from '../../../../modules/lessons/infrastructure/lesson.in-memory.repository';
import { Id } from '../../../../shared';
import { CompletionMother } from '../../completions/completion.mother';
import { LessonMother } from '../../lessons/lesson.mother';
import { ModuleMother } from '../../modules/module.mother';

describe('course service', () => {
	it(`
        GIVEN there is a course with a single module and a single lesson
        AND a user has completed the lesson
        WHEN the service is called to get the total lessons of the course
        THEN I receive all the lessons of the course
    `, async () => {
		const completionRepository = new CompletionInMemoryRepository();
		const lessonRepository = new LessonInMemoryRepository();

		const service = new CourseService(completionRepository, lessonRepository);

		const courseId = 'courseId123';
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

		// GIVEN
		completionRepository.insertModule(moduleExample);
		lessonRepository.insertModule(moduleExample);

		completionRepository.insertLesson(lessonExample);
		lessonRepository.insert(lessonExample);

		// AND
		completionRepository.insert(
			CompletionMother.create({
				lessonId: 'lessonId123',
				userId: 'userId12345',
			}),
		);

		// WHEN
		const totalLessonsCount = await service.getTotalLessonsCount(
			Id.createExisted(courseId),
		);

		// THEN
		expect(totalLessonsCount).toBe(1);
	});
});
