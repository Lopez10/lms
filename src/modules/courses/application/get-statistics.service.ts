import { Id } from '../../../shared';
import { CourseService } from '../domain/course.service';

export interface StatisticsDto {
	total_lessons: number;
	completed_lessons: number;
	percentage: number;
}

export class GetStatisticsService {
	constructor(private courseService: CourseService) {}

	async run(courseId: Id): Promise<StatisticsDto> {
		const progress = await this.courseService.getCourseProgress(courseId);
		const totalLessons =
			await this.courseService.getTotalLessonsCount(courseId);
		const completedLessons =
			await this.courseService.getCompletedLessonsCount(courseId);

		const statistics: StatisticsDto = {
			total_lessons: totalLessons,
			completed_lessons: completedLessons,
			percentage: progress,
		};

		return statistics;
	}
}
