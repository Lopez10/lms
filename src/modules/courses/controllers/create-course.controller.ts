import { Request, Response } from 'express';
import { CreateCourseUseCase } from '../application/create-course.use-case';
import { CoursePrimitives } from '../domain/course.entity';
import { sendBadRequest, sendCreated } from '../../../shared';
import { COURSES_DEPENDENCIES } from './course.dependencies';
import { CourseMapper } from '../application/course.mapper';

const EMPTY_STATISTICS = {
	completedLessons: 0,
	totalLessons: 0,
	percentage: 0,
};

export const createCourse = async (req: Request, res: Response) => {
	try {
		const createCourseDto: CoursePrimitives = req.body;
		const createCourseUseCase = new CreateCourseUseCase(
			COURSES_DEPENDENCIES.coursePrismaRepository,
		);

		const courseCreated = await createCourseUseCase.run(createCourseDto);
		const responseCourseDto = CourseMapper.toDtoWithStatistics(
			courseCreated,
			EMPTY_STATISTICS,
		);

		return sendCreated(res, {
			message: 'Course created successfully',
			data: responseCourseDto,
		});
	} catch (error) {
		console.error(error);
		return sendBadRequest(res);
	}
};
