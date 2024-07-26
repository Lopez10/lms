import { Request, Response } from 'express';
import { sendOk } from '../../../shared';
import { GetCoursesUseCase } from '../application/get-courses.use-case';
import { Course } from '../domain/course.entity';
import { COURSES_DEPENDENCIES } from './course.dependencies';

export const getCourses = async (req: Request, res: Response) => {
	const getCoursesUseCase = new GetCoursesUseCase(
		COURSES_DEPENDENCIES.coursePrismaRepository,
	);

	const courses = await getCoursesUseCase.run();
	const responseCoursesDto = await Promise.all(
		courses.map(async (course: Course) => {
			const statistics = await COURSES_DEPENDENCIES.getStatisticsService.run(
				course.id,
			);
			return {
				id: course.id.value,
				title: course.props.title,
				statistics,
			};
		}),
	);

	return sendOk(res, responseCoursesDto);
};
