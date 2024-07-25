import { CreateLessonUseCase } from '../../../modules/lessons/application/create-lesson.use-case';
import { LessonInMemoryRepository } from '../../../modules/lessons/infrastructure/lesson.in-memory.repository';

describe('create lesson use case', () => {
	it(`
        GIVEN there are a title and a module id
        WHEN I create a lesson
        THEN the lesson is created successfully
    `, async () => {
		const lessonRepository = new LessonInMemoryRepository();
		const createLesson = new CreateLessonUseCase(lessonRepository);

		// GIVEN
		const title = 'lesson title';
		const moduleId = 'module12345';

		// WHEN
		const lesson = await createLesson.run({ title, moduleId });

		// THEN
		expect(lesson).toBeDefined();
		expect(lesson.id).toBeDefined();
		expect(lesson.props.title).toBe(title);
		expect(lesson.props.moduleId.value).toBe(moduleId);
	});
});
