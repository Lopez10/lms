import {
	CourseDto,
	CourseMapper,
	CourseResponseDTO,
} from '../../../modules/courses/application/course.mapper';
import { Course } from '../../../modules/courses/models/Course';

export class CourseMother {
	static create(params: Partial<CourseResponseDTO>): Course {
		const courseDto: CourseDto = {
			id: 'course-id',
			title: 'course-title',
			...params,
		};
		return CourseMapper.toDomain(courseDto);
	}
}
