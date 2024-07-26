import { Id } from '../../../shared';
import { CourseService } from '../domain/course.service';

export interface StatisticsDto {
	totalLessons: number;
	completedLessons: number;
	percentage: number;
}

export class GetStatisticsService {
	constructor(private courseService: CourseService) {}

	async run(courseId: Id): Promise<StatisticsDto> {
		const percentage = await this.courseService.getCourseProgress(courseId);
		const totalLessons =
			await this.courseService.getTotalLessonsCount(courseId);
		const completedLessons =
			await this.courseService.getCompletedLessonsCount(courseId);

		return {
			totalLessons,
			completedLessons,
			percentage,
		};
	}
}
