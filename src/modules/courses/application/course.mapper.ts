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
}
