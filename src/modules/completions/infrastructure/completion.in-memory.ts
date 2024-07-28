import { Id } from '../../../shared';
import { Lesson } from '../../lessons/domain/lesson.entity';
import { Module } from '../../modules/domain/module.entity';
import { Completion } from '../domain/completion.entity';
import { CompletionPortRepository } from '../domain/completion.port.repository';

export class CompletionInMemoryRepository implements CompletionPortRepository {
	private readonly completions: Completion[] = [];
	private lessons: Lesson[] = [];
	private modules: Module[] = [];

	insert(completion: Completion): Promise<void> {
		this.completions.push(completion);

		return Promise.resolve();
	}

	async countCompletedLessonByCourseId(courseId: Id): Promise<number> {
		const moduleIds: Id[] = this.modules.reduce((ids: Id[], module) => {
			if (module.props.courseId.equals(courseId)) {
				ids.push(module.id);
			}
			return ids;
		}, []);

		const lessonIds = this.lessons.reduce((ids: Id[], lesson) => {
			if (moduleIds.some((id) => id.equals(lesson.props.moduleId))) {
				ids.push(lesson.id);
			}
			return ids;
		}, []);

		return this.completions.reduce((count: number, completion) => {
			if (lessonIds.some((id) => id.equals(completion.props.lessonId))) {
				count++;
			}
			return count;
		}, 0);
	}

	getByLessonId(lessonId: Id): Promise<Completion | null> {
		const completion = this.completions.find((c) =>
			c.props.lessonId.equals(lessonId),
		);

		return Promise.resolve(completion || null);
	}

	insertLesson(lesson: Lesson): Promise<void> {
		this.lessons.push(lesson);

		return Promise.resolve();
	}

	insertModule(module: Module): Promise<void> {
		this.modules.push(module);

		return Promise.resolve();
	}

	getLessons(): Lesson[] {
		return this.lessons;
	}

	getModules(): Module[] {
		return this.modules;
	}
}
