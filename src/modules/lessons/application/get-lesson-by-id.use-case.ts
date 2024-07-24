import { Id } from '../../../shared';
import { LessonPortRepository } from '../models/lesson.port.repository';
import { LessonResponseDTO } from './lesson.mapper';

export class GetLessonByIdUseCase {
	constructor(private readonly lessonRepository: LessonPortRepository) {}

	async run(id: string): Promise<LessonResponseDTO> {
		const lessonId = Id.createExisted(id);
		const lesson = await this.lessonRepository.getById(lessonId);

		if (!lesson) {
			throw new Error('Lesson not found');
		}

		// TODO: check Lesson is completed

		return {
			id: lesson.id.value,
			title: lesson.props.title,
			module_id: lesson.props.moduleId,
			is_completed: false,
		};
	}
}
