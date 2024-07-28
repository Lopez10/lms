import { Id } from '../../../shared';
import { Completion } from './completion.entity';

export interface CompletionPortRepository {
	insert(completion: Completion): Promise<void>;
	getByLessonId(lessonId: Id): Promise<Completion | null>;
	countCompletedLessonByCourseId(courseId: Id): Promise<number>;
}
