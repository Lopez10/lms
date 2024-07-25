import { Lesson, LessonPrimitives } from '../models/lesson.entity';
import { LessonPortRepository } from '../models/lesson.port.repository';
import { LessonResponseDto } from './lesson.mapper';

export class CreateLessonUseCase {
	constructor(private readonly lessonRepository: LessonPortRepository) {}

	async run(createLessonDto: LessonPrimitives): Promise<LessonResponseDto> {
		const lesson = Lesson.createByPrimitives(createLessonDto);
		await this.lessonRepository.insert(lesson);

		return {
			id: lesson.id.value,
			title: lesson.props.title,
			module_id: lesson.props.moduleId.value,
			is_completed: false,
		};
	}
}
