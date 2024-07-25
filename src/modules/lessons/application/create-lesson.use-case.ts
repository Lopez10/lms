import { Lesson, LessonPrimitives } from '../domain/lesson.entity';
import { LessonPortRepository } from '../domain/lesson.port.repository';

export class CreateLessonUseCase {
	constructor(private readonly lessonRepository: LessonPortRepository) {}

	async run(createLessonDto: LessonPrimitives): Promise<Lesson> {
		const lesson = Lesson.createByPrimitives(createLessonDto);
		await this.lessonRepository.insert(lesson);

		return lesson;
	}
}
