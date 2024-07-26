import { Id } from '../../../shared';
import { Completion } from './completion.entity';

export interface CompletionPortRepository {
	insert(completion: Completion): Promise<void>;
	getByLessonAndUser(lessonId: Id, userId: Id): Promise<Completion | null>;
	countCompletedLessonByCourseId(courseId: Id): Promise<number>;
}
