import { Id } from '../../../shared';
import { NotFoundException } from '../../../shared/application/exceptions';
import { Course } from '../domain/course.entity';
import { CoursePortRepository } from '../domain/course.port.repository';

export class GetCourseByIdUseCase {
	constructor(private readonly courseRepository: CoursePortRepository) {}

	async run(id: string): Promise<Course> {
		const courseId = Id.createExisted(id);
		const course = await this.courseRepository.getById(courseId);

		if (!course) {
			throw new NotFoundException('Course not found');
		}

		return course;
	}
}
