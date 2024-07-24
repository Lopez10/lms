import { CourseResponseDTO } from '../controllers/courses.controllers';
import { Course } from '../models/Course';
import { CoursePortRepository } from '../models/course.port.repository';

export interface CreateCourseDto {
	title: string;
}

export class CreateCourse {
	constructor(private readonly courseRepository: CoursePortRepository) {}

	async run(courseDto: CreateCourseDto): Promise<void> {
		const course = Course.create({ title: courseDto.title });

		await this.courseRepository.insert(course);
	}
}
