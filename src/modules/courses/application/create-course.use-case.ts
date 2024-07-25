import { Course, CoursePrimitives } from '../domain/course.entity';
import { CoursePortRepository } from '../domain/course.port.repository';

export class CreateCourse {
	constructor(private readonly courseRepository: CoursePortRepository) {}

	async run(courseDto: CoursePrimitives): Promise<Course> {
		const course = Course.createByPrimitives(courseDto);

		await this.courseRepository.insert(course);

		return course;
	}
}
