import { Id } from '../../../shared';
import { Course } from '../domain/course.entity';

export interface CourseDto {
	id: string;
	title: string;
}

export class CourseMapper {
	static toDto(course: Course): CourseDto {
		return {
			id: course.id.value,
			title: course.props.title,
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
