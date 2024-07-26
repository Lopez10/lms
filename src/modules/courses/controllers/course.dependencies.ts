import { CoursePrismaRepository } from '../infrastructure/course.prisma.repository';
import { CourseService } from '../domain/course.service';
import { LESSON_DEPENDENCIES } from '../../lessons/controllers/lesson.dependencies';
import { COMPLETION_DEPENDENCIES } from '../../completions/controllers/completion.dependencies';

const coursePrismaRepository = new CoursePrismaRepository();

const courseService = new CourseService(
	COMPLETION_DEPENDENCIES.completionPrismaRepository,
	LESSON_DEPENDENCIES.lessonRepository,
);

export const COURSES_DEPENDENCIES = {
	coursePrismaRepository,
	courseService,
};
