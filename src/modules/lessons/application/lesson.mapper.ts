import { Id } from '../../../shared';
import { Lesson } from '../domain/lesson.entity';

export interface LessonDto {
	id: string;
	name: string;
	moduleId: string;
}

export class LessonMapper {
	static toDto(lesson: Lesson) {
		return {
			id: lesson.id,
			name: lesson.props.title,
			moduleId: lesson.props.moduleId,
		};
	}

	static toDomain(lesson: LessonDto): Lesson {
		return Lesson.create(
			{
				title: lesson.name,
				moduleId: Id.createExisted(lesson.moduleId),
			},
			Id.createExisted(lesson.id),
		);
	}

	static toDtoWithCompletion(lesson: Lesson, isCompleted: boolean) {
		return {
			...LessonMapper.toDto(lesson),
			isCompleted,
		};
	}
}
