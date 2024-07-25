import { Lesson } from '../domain/lesson.entity';
import { LessonPortRepository } from '../domain/lesson.port.repository';

export class GetLessonsUseCase {
	constructor(private readonly lessonRepository: LessonPortRepository) {}

	async run(): Promise<Lesson[]> {
		const lessons = await this.lessonRepository.getAll();

		return lessons;
	}
}
