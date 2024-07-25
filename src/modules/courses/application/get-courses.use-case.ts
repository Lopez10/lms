import { Course } from '../domain/course.entity';
import { CoursePortRepository } from '../domain/course.port.repository';

export class GetCoursesUseCase {
	constructor(private readonly courseRepository: CoursePortRepository) {}

	async run(): Promise<Course[]> {
		const courses = await this.courseRepository.getAll();

		return courses;
	}
}
