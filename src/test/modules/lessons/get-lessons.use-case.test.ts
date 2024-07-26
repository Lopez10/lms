import { GetLessonsUseCase } from '../../../modules/lessons/application/get-lessons.use-case';
import { LessonInMemoryRepository } from '../../../modules/lessons/infrastructure/lesson.in-memory.repository';
import { LessonMother } from './lesson.mother';

describe('get lessons use case', () => {
	it(`
        GIVEN there are lessons inserted in the repository
        WHEN I get all lessons
        THEN the lessons are returned successfully
    `, async () => {
		const lessonRepository = new LessonInMemoryRepository();
		const getLessons = new GetLessonsUseCase(lessonRepository);
		const id1 = 'lessonId123';
		const id2 = 'lessonId223';

		// GIVEN
		const lesson1 = LessonMother.create({ id: id1 });
		const lesson2 = LessonMother.create({ id: id2 });
		lessonRepository.insert(lesson1);
		lessonRepository.insert(lesson2);

		// WHEN
		const lessons = await getLessons.run();

		// THEN
		expect(lessons).toHaveLength(2);
		expect(lessons[0].id).toBeDefined();
		expect(lessons[0].id.value).toBe(id1);
		expect(lessons[1].id).toBeDefined();
		expect(lessons[1].id.value).toBe(id2);
	});
	it(`
        GIVEN there are no lessons inserted in the repository
        WHEN I get all lessons
        THEN an empty array is returned
    `, async () => {
		const lessonRepository = new LessonInMemoryRepository();
		const getLessons = new GetLessonsUseCase(lessonRepository);

		// GIVEN

		// WHEN
		const lessons = await getLessons.run();

		// THEN
		expect(lessons).toHaveLength(0);
	});
});
