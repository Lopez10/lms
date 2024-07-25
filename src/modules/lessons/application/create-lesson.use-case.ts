import { Lesson, LessonPrimitives } from '../models/lesson.entity';
import { LessonPortRepository } from '../models/lesson.port.repository';

export class CreateLessonUseCase {
	constructor(private readonly lessonRepository: LessonPortRepository) {}

	async run(createLessonDto: LessonPrimitives): Promise<Lesson> {
		const lesson = Lesson.createByPrimitives(createLessonDto);
		await this.lessonRepository.insert(lesson);

		return lesson;
	}
}
