import { LessonCompleteService } from '../../../../modules/lessons/domain/lesson-complete.service';
import { Id } from '../../../../shared';
import { CompletionMother } from '../../completions/completion.mother';
import { CompletionInMemoryRepository } from '../../completions/infrastructure/completion.in-memory';
import { ModuleMother } from '../../modules/module.mother';
import { LessonMother } from '../lesson.mother';

describe('lesson complete service test', () => {
	it(`
        GIVEN there is a module with a lesson 
        AND the lesson is completed by a random user
        WHEN the service is called to check if the lesson is completed
        THEN I receive true
    `, async () => {
		const completionRepository = new CompletionInMemoryRepository();
		const service = new LessonCompleteService(completionRepository);
		const lessonId = 'lessonId123';

		// GIVEN
		completionRepository.insertModule(
			ModuleMother.create({ id: 'moduleId123' }),
		);
		completionRepository.insertLesson(LessonMother.create({ id: lessonId }));

		// AND
		completionRepository.insert(CompletionMother.create({ lessonId }));

		// WHEN
		const isLessonCompleted = await service.isLessonCompleted(
			Id.createExisted(lessonId),
		);

		// THEN
		expect(isLessonCompleted).toBe(true);
	});

	it(`
		GIVEN there is a module with a lesson and the lesson is not completed 
		WHEN the service is called to check if the lesson is completed
		THEN I receive false
	`, async () => {
		const completionRepository = new CompletionInMemoryRepository();
		const service = new LessonCompleteService(completionRepository);
		const lessonId = 'lessonId123';

		// GIVEN
		completionRepository.insertModule(
			ModuleMother.create({ id: 'moduleId123' }),
		);
		completionRepository.insertLesson(LessonMother.create({ id: lessonId }));

		// WHEN
		const isLessonCompleted = await service.isLessonCompleted(
			Id.createExisted(lessonId),
		);

		// THEN
		expect(isLessonCompleted).toBe(false);
	});
});
