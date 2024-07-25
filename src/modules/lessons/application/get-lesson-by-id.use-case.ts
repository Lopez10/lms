import { Id } from '../../../shared';
import { LessonPortRepository } from '../models/lesson.port.repository';
import { LessonResponseDto } from './lesson.mapper';

export class GetLessonByIdUseCase {
	constructor(private readonly lessonRepository: LessonPortRepository) {}

	async run(id: string): Promise<LessonResponseDto> {
		const lessonId = Id.createExisted(id);
		const lesson = await this.lessonRepository.getById(lessonId);

		if (!lesson) {
			throw new Error('Lesson not found');
		}

		// TODO: check Lesson is completed

		return {
			id: lesson.id.value,
			title: lesson.props.title,
			module_id: lesson.props.moduleId.value,
			is_completed: false,
		};
	}
}
