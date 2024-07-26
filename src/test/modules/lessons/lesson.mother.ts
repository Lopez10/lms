import {
	LessonDto,
	LessonMapper,
} from '../../../modules/lessons/application/lesson.mapper';
import { Lesson } from '../../../modules/lessons/domain/lesson.entity';

export class LessonMother {
	static create(params: Partial<LessonDto>): Lesson {
		const lessonDto: LessonDto = {
			id: 'lessonId123',
			name: 'lesson-name',
			moduleId: 'moduleId123',
			...params,
		};

		return LessonMapper.toDomain(lessonDto);
	}
}
