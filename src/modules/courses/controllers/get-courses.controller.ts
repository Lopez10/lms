import { Request, Response } from 'express';
import { sendOk } from '../../../shared';
import { CompletionPrismaRepository } from '../../completions/infrastructure/completion.prisma.repository';
import { LessonPrismaRepository } from '../../lessons/infrastructure/lesson.prisma.repository';
import { GetCoursesUseCase } from '../application/get-courses.use-case';
import { CoursePrismaRepository } from '../infrastructure/course.prisma.repository';
import { Course } from '../domain/course.entity';
import { CourseService } from '../domain/course.service';
import { COURSES_DEPENDENCIES } from './course.dependencies';

export const getCourses = async (req: Request, res: Response) => {
	const getCoursesUseCase = new GetCoursesUseCase(
		COURSES_DEPENDENCIES.coursePrismaRepository,
	);

	const courses = await getCoursesUseCase.run();

	const courseService = COURSES_DEPENDENCIES.courseService;

	const responseCoursesDto = await Promise.all(
		courses.map(async (course: Course) => {
			const [progress, totalLessons, completedLessons] = await Promise.all([
				courseService.getCourseProgress(course.id),
				courseService.getTotalLessonsCount(course.id),
				courseService.getCompletedLessonsCount(course.id),
			]);

			return {
				id: course.id.value,
				title: course.props.title,
				statistics: {
					total_lessons: totalLessons,
					completed_lessons: completedLessons,
					percentage: progress,
				},
			};
		}),
	);

	return sendOk(res, responseCoursesDto);
};
