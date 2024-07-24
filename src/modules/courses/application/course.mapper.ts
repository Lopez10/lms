import { Id } from '../../../shared';
import { Course } from '../models/Course';

export interface CourseResponseDTO {
	id: string;
	title: string;
	completion: CompletionDTO;
}

export interface CompletionDTO {
	total_lessons: number;
	completed_lessons: number;
	percentage: number;
}

export interface CourseDto {
	id: string;
	title: string;
}

export class CourseMapper {
	static toDto(
		course: Course,
		completionDto: CompletionDTO,
	): CourseResponseDTO {
		return {
			id: course.id.value,
			title: course.props.title,
			completion: {
				total_lessons: completionDto.total_lessons,
				completed_lessons: completionDto.completed_lessons,
				percentage: completionDto.percentage,
			},
		};
	}

	static toDomain(courseDto: CourseDto): Course {
		const course = Course.create(
			{
				title: courseDto.title,
			},
			Id.createExisted(courseDto.id),
		);
		return course;
	}
}
