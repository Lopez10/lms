import { Id } from '../../../shared';
import { Completion } from './Completion';

export interface CompletionPortRepository {
	insert(completion: Completion): Promise<void>;

	countCompletedLessonByCourseId(courseId: Id): Promise<number>;
}
