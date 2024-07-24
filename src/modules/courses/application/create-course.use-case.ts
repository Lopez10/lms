import { CourseResponseDTO } from '../controllers/courses.controllers';
import { Course } from '../models/Course';
import { CoursePortRepository } from '../models/course.port.repository';

export interface CreateCourseDto {
	title: string;
}

export class CreateCourse {
	constructor(private readonly courseRepository: CoursePortRepository) {}

	async run(courseDto: CreateCourseDto): Promise<CourseResponseDTO> {
		const course = Course.create({ title: courseDto.title });

		await this.courseRepository.insert(course);

		return {
			id: course.id.value,
			title: course.props.title,
			completion: {
				total_lessons: 0,
				completed_lessons: 0,
				percentage: 0,
			},
		};
	}
}
