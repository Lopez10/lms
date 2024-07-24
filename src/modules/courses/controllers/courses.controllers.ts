import { Request, Response } from 'express';
import {
	sendBadRequest,
	sendCreated,
	sendMethodNotImplemented,
	sendOk,
} from '../../../shared/responses.utils';
import { ModuleResponsePopulatedDTO } from '../../modules/controllers/modules.controllers';
import { CoursePrismaRepository } from '../infrastructure/course.prisma.repository';
import {
	CreateCourse,
	CreateCourseDto,
} from '../application/create-course.use-case';
import { GetCourseByIdUseCase } from '../application/get-course-by-id.use-case';
import { LessonPrismaRepository } from '../../lessons/infrastructure/lesson.prisma.repository';
import { CompletionPrismaRepository } from '../../completions/infrastructure/completion.prisma.repository';
import { CourseService } from '../models/course.service';
import { ModuleResponseDTO } from '../../modules/application/module.mapper';
import { CourseResponseDTO } from '../application/course.mapper';

export interface CourseResponsePopulatedDTO extends CourseResponseDTO {
	modules: (ModuleResponseDTO | ModuleResponsePopulatedDTO)[];
}

const coursePrismaRepository = new CoursePrismaRepository();
const lessonRepository = new LessonPrismaRepository();
const completionRepository = new CompletionPrismaRepository();

const courseService = new CourseService(completionRepository, lessonRepository);

export const createCourse = async (req: Request, res: Response) => {
	try {
		const createCourseDto: CreateCourseDto = req.body;
		const createCourseUseCase = new CreateCourse(coursePrismaRepository);

		const courseCreated = await createCourseUseCase.run(createCourseDto);

		sendCreated(res, {
			message: 'Course created successfully',
			data: courseCreated,
		});
	} catch (error) {
		return sendBadRequest(res);
	}
};

export const getCourseById = async (req: Request, res: Response) => {
	const getCourseByIdUseCase = new GetCourseByIdUseCase(
		coursePrismaRepository,
		courseService,
	);
	const { id } = req.params;

	const course = await getCourseByIdUseCase.run(id);

	return sendOk(res, course);
};

export const getCourses = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};
