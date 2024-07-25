import { Id } from '../../../shared';
import { Module } from '../../modules/domain/module.entity';
import { Lesson } from '../domain/lesson.entity';
import { LessonPortRepository } from '../domain/lesson.port.repository';

export class LessonInMemoryRepository implements LessonPortRepository {
	private readonly lessons: Lesson[] = [];
	private readonly modules: Module[] = [];

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

	async countTotalLessonByCourseId(courseId: Id): Promise<number> {
		const moduleIds = this.modules
			.filter((module) => module.props.courseId.equals(courseId))
			.map((module) => module.id);

		return this.lessons.filter((lesson) =>
			moduleIds.includes(lesson.props.moduleId),
		).length;
	}
}
