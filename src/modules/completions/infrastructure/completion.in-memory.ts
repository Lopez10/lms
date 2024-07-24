import { Id } from '../../../shared';
import { Lesson } from '../../lessons/models/Lesson';
import { Module } from '../../modules/models/Module';
import { Completion } from '../models/Completion';
import { CompletionPortRepository } from '../models/completion.port.repository';

export class CompletionInMemoryRepository implements CompletionPortRepository {
	private readonly completions: Completion[] = [];
	private lessons: Lesson[] = [];
	private modules: Module[] = [];

	insert(completion: Completion): Promise<void> {
		this.completions.push(completion);

		return Promise.resolve();
	}

	async countCompletedLessonByCourseId(courseId: Id): Promise<number> {
		const moduleIds = this.modules
			.filter((module) => module.props.courseId.equals(courseId))
			.map((module) => module.id);

		const lessonIds = this.lessons
			.filter((lesson) => moduleIds.includes(lesson.props.moduleId))
			.map((lesson) => lesson.id);

		return this.completions.filter((completion) =>
			lessonIds.includes(completion.props.lessonId),
		).length;
	}
}
