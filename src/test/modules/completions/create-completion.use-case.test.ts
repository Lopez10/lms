import { CreateCompletationUseCase } from '../../../modules/completions/application/create-completation.use-case';
import { CompletionInMemoryRepository } from './infrastructure/completion.in-memory';

describe('create completion use case', () => {
	it(`
		GIVEN there are a lesson id and a user id
		WHEN I create a completion
		THEN the completion is created successfully
	`, async () => {
		const completionRepository = new CompletionInMemoryRepository();
		const createCompletion = new CreateCompletationUseCase(
			completionRepository,
		);

		// GIVEN
		const lessonId = 'lessonId123';
		const userId = 'userId12345';

		// WHEN
		const completion = await createCompletion.run({ lessonId, userId });

		// THEN
		expect(completion).toBeDefined();
		expect(completion.id).toBeDefined();
		expect(completion.props.lessonId.value).toBe(lessonId);
		expect(completion.props.userId.value).toBe(userId);
	});
});
