import { Id } from '../../../shared';
import { Lesson } from './lesson.entity';

export interface LessonPortRepository {
	insert(lesson: Lesson): Promise<void>;
	getById(id: Id): Promise<Lesson | null>;
	getAll(): Promise<Lesson[]>;

	countTotalLessonByCourseId(courseId: Id): Promise<number>;
}
