import { Course } from '../models/Course';
import { CoursePortRepository } from '../models/course.port.repository';
import { CourseService } from '../models/course.service';
import {
	CompletionDTO,
	CourseMapper,
	CourseResponseDTO,
} from './course.mapper';

export class GetCoursesUseCase {
	constructor(
		private readonly courseRepository: CoursePortRepository,
		private readonly courseService: CourseService,
	) {}

	async run(): Promise<CourseResponseDTO[]> {
		const courses = await this.courseRepository.getAll();

		const courseResponses = await Promise.all(
			courses.map(async (course: Course) => {
				const [progress, totalLessons, completedLessons] = await Promise.all([
					this.courseService.getCourseProgress(course.id),
					this.courseService.getTotalLessonsCount(course.id),
					this.courseService.getCompletedLessonsCount(course.id),
				]);

				const completionDto: CompletionDTO = {
					total_lessons: totalLessons,
					completed_lessons: completedLessons,
					percentage: progress,
				};

				return CourseMapper.toDto(course, completionDto);
			}),
		);

		return courseResponses;
	}
}
