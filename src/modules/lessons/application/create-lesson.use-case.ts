import { Lesson } from '../models/lesson.entity';
import { LessonPortRepository } from '../models/lesson.port.repository';
import { LessonMapper, LessonResponseDTO } from './lesson.mapper';

export interface CreateLessonDto {
	title: string;
	moduleId: string;
}

export class CreateLessonUseCase {
	constructor(private readonly lessonRepository: LessonPortRepository) {}

	async run(createLessonDto: CreateLessonDto): Promise<LessonResponseDTO> {
		const lesson = Lesson.create(createLessonDto);
		await this.lessonRepository.insert(lesson);

		// TODO: check Lesson is completed

		return {
			id: lesson.id.value,
			title: lesson.props.title,
			module_id: lesson.props.moduleId,
			is_completed: false,
		};
	}
}
