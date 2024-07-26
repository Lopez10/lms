import { Request, Response } from 'express';
import { sendOk } from '../../../shared';
import { GetCoursesUseCase } from '../application/get-courses.use-case';
import { Course } from '../domain/course.entity';
import { COURSES_DEPENDENCIES } from './course.dependencies';
import { GetStatisticsService } from '../application/get-statistics.service';

export const getCourses = async (req: Request, res: Response) => {
	const getCoursesUseCase = new GetCoursesUseCase(
		COURSES_DEPENDENCIES.coursePrismaRepository,
	);
	const getStatisticsService = new GetStatisticsService(
		COURSES_DEPENDENCIES.courseService,
	);

	const courses = await getCoursesUseCase.run();
	const responseCoursesDto = await Promise.all(
		courses.map(async (course: Course) => {
			const statistics = await getStatisticsService.run(course.id);
			return {
				id: course.id.value,
				title: course.props.title,
				statistics,
			};
		}),
	);

	return sendOk(res, responseCoursesDto);
};
