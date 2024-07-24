import { LessonPortRepository } from '../models/lesson.port.repository';
import { LessonResponseDTO, LessonMapper } from './lesson.mapper';

export class GetLessonsUseCase {
	constructor(private readonly lessonRepository: LessonPortRepository) {}

	async run(): Promise<LessonResponseDTO[]> {
		const lessons = await this.lessonRepository.getAll();

		// TODO: check Lesson is completed

		return lessons.map((lesson) => ({
			id: lesson.id.value,
			title: lesson.props.title,
			module_id: lesson.props.moduleId,
			is_completed: false,
		}));
	}
}
