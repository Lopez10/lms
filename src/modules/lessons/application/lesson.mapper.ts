import { Id } from '../../../shared';
import { Lesson } from '../domain/lesson.entity';

export interface LessonDto {
	id: string;
	title: string;
	moduleId: string;
}

export class LessonMapper {
	static toDto(lesson: Lesson) {
		return {
			id: lesson.id.value,
			title: lesson.props.title,
			moduleId: lesson.props.moduleId.value,
		};
	}

	static toDomain(lesson: LessonDto): Lesson {
		return Lesson.create(
			{
				title: lesson.title,
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
