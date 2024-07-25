import { Request, Response } from 'express';
import { CreateCourse } from '../application/create-course.use-case';
import { CoursePrimitives } from '../domain/course.entity';
import { sendBadRequest, sendCreated } from '../../../shared';
import {
	CourseResponseWithStatisticsDto,
	COURSES_DEPENDENCIES,
} from './course.dependencies';

export const createCourse = async (req: Request, res: Response) => {
	try {
		const createCourseDto: CoursePrimitives = req.body;
		const createCourseUseCase = new CreateCourse(
			COURSES_DEPENDENCIES.coursePrismaRepository,
		);

		const courseCreated = await createCourseUseCase.run(createCourseDto);
		const responseCourseDto: CourseResponseWithStatisticsDto = {
			id: courseCreated.id.value,
			title: courseCreated.id.value,
			statistics: {
				total_lessons: 0,
				completed_lessons: 0,
				percentage: 0,
			},
		};

		sendCreated(res, {
			message: 'Course created successfully',
			data: responseCourseDto,
		});
	} catch (error) {
		return sendBadRequest(res);
	}
};
