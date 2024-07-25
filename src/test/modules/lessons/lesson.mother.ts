import {
	LessonDto,
	LessonMapper,
} from '../../../modules/lessons/application/lesson.mapper';
import { Lesson } from '../../../modules/lessons/models/lesson.entity';

export class LessonMother {
	static create(params: Partial<LessonDto>): Lesson {
		const lessonDto: LessonDto = {
			id: 'lesson-id',
			name: 'lesson-name',
			moduleId: 'module-id',
			...params,
		};

		return LessonMapper.toDomain(lessonDto);
	}
}
