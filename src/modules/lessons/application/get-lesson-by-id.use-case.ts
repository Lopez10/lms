import { Id } from '../../../shared';
import { Lesson } from '../models/lesson.entity';
import { LessonPortRepository } from '../models/lesson.port.repository';

export class GetLessonByIdUseCase {
	constructor(private readonly lessonRepository: LessonPortRepository) {}

	async run(id: string): Promise<Lesson> {
		const lessonId = Id.createExisted(id);
		const lesson = await this.lessonRepository.getById(lessonId);

		if (!lesson) {
			throw new Error('Lesson not found');
		}

		return lesson;
	}
}
