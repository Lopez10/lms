import { Id } from '../../../shared';
import { NotFoundException } from '../../../shared/application/exceptions';
import { Lesson } from '../domain/lesson.entity';
import { LessonPortRepository } from '../domain/lesson.port.repository';

export class GetLessonByIdUseCase {
	constructor(private readonly lessonRepository: LessonPortRepository) {}

	async run(id: string): Promise<Lesson> {
		const lessonId = Id.createExisted(id);
		const lesson = await this.lessonRepository.getById(lessonId);

		if (!lesson) {
			throw new NotFoundException('Lesson not found');
		}

		return lesson;
	}
}
