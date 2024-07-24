import { Course } from '../models/Course';
import { CompletionDTO, CourseResponseDTO } from './course.dto';

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
