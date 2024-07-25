import { Request, Response } from 'express';
import { sendOk } from '../../../shared';
import { GetCourseByIdUseCase } from '../application/get-course-by-id.use-case';
import {
	CourseResponseWithStatisticsDto,
	COURSES_DEPENDENCIES,
} from './courses.dependencies';

export const getCourseById = async (req: Request, res: Response) => {
	const getCourseByIdUseCase = new GetCourseByIdUseCase(
		COURSES_DEPENDENCIES.coursePrismaRepository,
	);

	const courseService = COURSES_DEPENDENCIES.courseService;

	const { id } = req.params;

	const course = await getCourseByIdUseCase.run(id);

	const progress = await courseService.getCourseProgress(course.id);
	const totalLessons = await courseService.getTotalLessonsCount(course.id);
	const completedLessons = await courseService.getCompletedLessonsCount(
		course.id,
	);

	const responseCourseDto: CourseResponseWithStatisticsDto = {
		id: course.id.value,
		title: course.id.value,
		statistics: {
			total_lessons: totalLessons,
			completed_lessons: completedLessons,
			percentage: progress,
		},
	};

	return sendOk(res, responseCourseDto);
};
