import { Id } from '../../../shared';
import { NotFoundException } from '../../../shared/application/exceptions';
import {
	CompletionDTO,
	CourseResponseDTO,
} from '../controllers/courses.controllers';
import { CoursePortRepository } from '../models/course.port.repository';
import { CourseService } from '../models/course.service';
import { toDto } from './toDto';

export class GetCourseByIdUseCase {
	constructor(
		private readonly courseRepository: CoursePortRepository,
		private readonly courseService: CourseService,
	) {}
	async run(id: string): Promise<CourseResponseDTO> {
		const courseId = Id.createExisted(id);
		const course = await this.courseRepository.getById(courseId);

		if (!course) {
			throw new NotFoundException('Course not found');
		}

		const progress = await this.courseService.getCourseProgress(courseId);
		const totalLessons =
			await this.courseService.getTotalLessonsCount(courseId);
		const completedLessons =
			await this.courseService.getCompletedLessonsCount(courseId);

		const completionDto: CompletionDTO = {
			total_lessons: totalLessons,
			completed_lessons: completedLessons,
			percentage: progress,
		};

		return toDto(course, completionDto);
	}
}
