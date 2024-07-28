import { GetLessonByIdUseCase } from '../../../../modules/lessons/application/get-lesson-by-id.use-case';
import { LessonInMemoryRepository } from '../infrastructure/lesson.in-memory.repository';
import { NotFoundException } from '../../../../shared/application/exceptions';
import { LessonMother } from '../lesson.mother';

describe('get lesson by id use case', () => {
	it(`
        GIVEN there is a lesson id inserted in the repository
        WHEN I get a lesson by id
        THEN the lesson is returned successfully
    `, async () => {
		const lessonRepository = new LessonInMemoryRepository();
		const getLessonById = new GetLessonByIdUseCase(lessonRepository);

		// GIVEN
		const id = 'lessonId123';
		lessonRepository.insert(LessonMother.create({ id }));

		// WHEN
		const lesson = await getLessonById.run(id);

		// THEN
		expect(lesson).toBeDefined();
		expect(lesson.id).toBeDefined();
		expect(lesson.id.value).toBe(id);
	});

	it(`
        GIVEN there is no lesson id inserted in the repository
        WHEN I get a lesson by id
        THEN a not found exception is thrown
    `, async () => {
		const lessonRepository = new LessonInMemoryRepository();
		const getLessonById = new GetLessonByIdUseCase(lessonRepository);

		// GIVEN
		const id = 'lessonId123';
		expect.assertions(1);
		try {
			// WHEN
			await getLessonById.run(id);
		} catch (error) {
			// THEN
			expect(error).toBeInstanceOf(NotFoundException);
		}
	});
});
