import { Course, CoursePrimitives } from '../models/course.entity';
import { CoursePortRepository } from '../models/course.port.repository';
import { CourseResponseDto } from './course.mapper';

export class CreateCourse {
	constructor(private readonly courseRepository: CoursePortRepository) {}

	async run(courseDto: CoursePrimitives): Promise<CourseResponseDto> {
		const course = Course.createByPrimitives(courseDto);

		await this.courseRepository.insert(course);

		return {
			id: course.id.value,
			title: course.props.title,
			statistics: {
				total_lessons: 0,
				completed_lessons: 0,
				percentage: 0,
			},
		};
	}
}
