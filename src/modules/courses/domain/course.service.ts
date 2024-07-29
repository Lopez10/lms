import { Id } from '../../../shared';
import { CompletionPortRepository } from '../../completions/domain/completion.port.repository';
import { LessonPortRepository } from '../../lessons/domain/lesson.port.repository';

export class CourseService {
	constructor(
		private completionRepository: CompletionPortRepository,
		private lessonRepository: LessonPortRepository,
	) {}

	async getCompletedLessonsCount(courseId: Id): Promise<number> {
		try {
			const count =
				await this.completionRepository.countCompletedLessonByCourseId(
					courseId,
				);
			return count;
		} catch (error) {
			console.error('Error counting completed lessons:', error);
			throw error;
		}
	}

	async getTotalLessonsCount(courseId: Id): Promise<number> {
		try {
			const count =
				await this.lessonRepository.countTotalLessonByCourseId(courseId);
			return count;
		} catch (error) {
			console.error('Error counting total lessons:', error);
			throw error;
		}
	}

	async getCourseProgress(courseId: Id): Promise<number> {
		try {
			const completedLessons = await this.getCompletedLessonsCount(courseId);
			const totalLessons = await this.getTotalLessonsCount(courseId);

			if (totalLessons === 0 || completedLessons === 0) {
				return 0;
			}

			const progress = (completedLessons / totalLessons) * 100;
			return progress;
		} catch (error) {
			console.error('Error calculating course progress:', error);
			throw error;
		}
	}
}
