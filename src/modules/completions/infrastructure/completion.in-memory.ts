import { Id } from '../../../shared';
import { Completion } from '../models/Completion';
import { CompletionPortRepository } from '../models/completion.port.repository';

export class CompletionInMemoryRepository implements CompletionPortRepository {
	private readonly completions: Completion[] = [];

	insert(completion: Completion): Promise<void> {
		this.completions.push(completion);

		return Promise.resolve();
	}
	countCompletedLessonByCourseId(courseId: Id): Promise<number> {
		throw new Error('Method not implemented.');
	}
}
