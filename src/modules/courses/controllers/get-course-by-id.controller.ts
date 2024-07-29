import { Request, Response } from 'express';
import { sendOk } from '../../../shared';
import { GetCourseByIdUseCase } from '../application/get-course-by-id.use-case';
import { COURSES_DEPENDENCIES } from './course.dependencies';
import { CourseMapper } from '../application/course.mapper';

export const getCourseById = async (req: Request, res: Response) => {
	const getCourseByIdUseCase = new GetCourseByIdUseCase(
		COURSES_DEPENDENCIES.coursePrismaRepository,
	);

	const { courseId } = req.params;

	const course = await getCourseByIdUseCase.run(courseId);
	const statistics = await COURSES_DEPENDENCIES.getStatisticsService.run(
		course.id,
	);

	const responseCourseDto = CourseMapper.toDtoWithStatistics(
		course,
		statistics,
	);

	return sendOk(res, responseCourseDto);
};
