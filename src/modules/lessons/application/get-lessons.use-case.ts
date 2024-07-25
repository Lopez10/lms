import { LessonPortRepository } from '../models/lesson.port.repository';
import { LessonResponseDto, LessonMapper } from './lesson.mapper';

export class GetLessonsUseCase {
	constructor(private readonly lessonRepository: LessonPortRepository) {}

	async run(): Promise<LessonResponseDto[]> {
		const lessons = await this.lessonRepository.getAll();

		// TODO: check Lesson is completed

		return lessons.map((lesson) => ({
			id: lesson.id.value,
			title: lesson.props.title,
			module_id: lesson.props.moduleId.value,
			is_completed: false,
		}));
	}
}
