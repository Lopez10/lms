import { Request, Response } from 'express';
import { sendOk } from '../../../shared';
import { GetCourseByIdUseCase } from '../application/get-course-by-id.use-case';
import { COURSES_DEPENDENCIES } from './course.dependencies';
import { GetStatisticsService } from '../application/get-statistics.service';
import { CourseMapper } from '../application/course.mapper';

export const getCourseById = async (req: Request, res: Response) => {
	const getCourseByIdUseCase = new GetCourseByIdUseCase(
		COURSES_DEPENDENCIES.coursePrismaRepository,
	);
	const getStatisticsService = new GetStatisticsService(
		COURSES_DEPENDENCIES.courseService,
	);

	const { id } = req.params;

	const course = await getCourseByIdUseCase.run(id);
	const statistics = await getStatisticsService.run(course.id);

	const responseCourseDto = CourseMapper.toDtoWithStatistics(
		course,
		statistics,
	);

	return sendOk(res, responseCourseDto);
};
