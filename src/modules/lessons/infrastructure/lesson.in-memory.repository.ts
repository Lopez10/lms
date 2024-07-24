import { Id } from '../../../shared';
import { Lesson } from '../models/Lesson';
import { LessonPortRepository } from '../models/lesson.port.repository';

export class LessonInMemoryRepository implements LessonPortRepository {
	private readonly lessons: Lesson[] = [];

	getById(id: Id): Promise<Lesson | null> {
		const lesson = this.lessons.find((lesson) => lesson.id.equals(id));

		return Promise.resolve(lesson || null);
	}
	getAll(): Promise<Lesson[]> {
		return Promise.resolve(this.lessons);
	}
	insert(lesson: Lesson): Promise<void> {
		this.lessons.push(lesson);

		return Promise.resolve();
	}

	countTotalLessonByCourseId(courseId: Id): Promise<number> {
		throw new Error('Method not implemented.');
	}
}
