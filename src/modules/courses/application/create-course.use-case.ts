import { Course, CoursePrimitives } from '../models/course.entity';
import { CoursePortRepository } from '../models/course.port.repository';

export class CreateCourse {
	constructor(private readonly courseRepository: CoursePortRepository) {}

	async run(courseDto: CoursePrimitives): Promise<Course> {
		const course = Course.createByPrimitives(courseDto);

		await this.courseRepository.insert(course);

		return course;
	}
}
