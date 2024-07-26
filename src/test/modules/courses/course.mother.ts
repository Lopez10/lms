import {
	CourseDto,
	CourseMapper,
} from '../../../modules/courses/application/course.mapper';
import { Course } from '../../../modules/courses/domain/course.entity';

export class CourseMother {
	static create(params: Partial<CourseDto>): Course {
		const courseDto: CourseDto = {
			id: 'courseId123',
			title: 'course-title',
			...params,
		};
		return CourseMapper.toDomain(courseDto);
	}
}
