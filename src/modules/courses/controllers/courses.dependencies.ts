import { CoursePrismaRepository } from '../infrastructure/course.prisma.repository';
import { CourseService } from '../models/course.service';
import { LESSON_DEPENDENCIES } from '../../lessons/controllers/lessons.controllers';
import { MODULE_DEPENDENCIES } from '../../modules/controllers/modules.controllers';

const coursePrismaRepository = new CoursePrismaRepository();

const courseService = new CourseService(
	MODULE_DEPENDENCIES.completionRepository,
	LESSON_DEPENDENCIES.lessonRepository,
);

export interface CourseResponseWithStatisticsDto {
	id: string;
	title: string;
	statistics: {
		total_lessons: number;
		completed_lessons: number;
		percentage: number;
	};
}

export const COURSES_DEPENDENCIES = {
	coursePrismaRepository,
	courseService,
};
