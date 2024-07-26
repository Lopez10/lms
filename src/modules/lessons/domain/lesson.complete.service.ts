import { Id } from '../../../shared';
import { CompletionPortRepository } from '../../completions/domain/completion.port.repository';

export class LessonCompleteService {
	constructor(
		private readonly completionRepository: CompletionPortRepository,
	) {}

	async isLessonCompleted(lessonId: Id, userId: Id): Promise<boolean> {
		const lessonCompletedFound =
			await this.completionRepository.getByLessonAndUser(lessonId, userId);

		return !!lessonCompletedFound;
	}
}
