import {
	CourseDto,
	CourseMapper,
	CourseResponseWithStatisticsDto,
} from '../../../modules/courses/application/course.mapper';
import { Course } from '../../../modules/courses/models/course.entity';

export class CourseMother {
	static create(params: Partial<CourseResponseWithStatisticsDto>): Course {
		const courseDto: CourseDto = {
			id: 'course-id',
			title: 'course-title',
			...params,
		};
		return CourseMapper.toDomain(courseDto);
	}
}
