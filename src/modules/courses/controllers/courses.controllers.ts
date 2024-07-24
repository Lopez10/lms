import { Request, Response } from 'express';
import {
	sendBadRequest,
	sendCreated,
	sendMethodNotImplemented,
	sendOk,
} from '../../../shared/responses.utils';
import {
	ModuleResponseDTO,
	ModuleResponsePopulatedDTO,
} from '../../modules/controllers/modules.controllers';
import { CoursePrismaRepository } from '../infrastructure/course.prisma.repository';
import {
	CreateCourse,
	CreateCourseDto,
} from '../application/create-course.use-case';

interface CompletionDTO {
	total_lessons: number;
	completed_lessons: number;
	percentage: number;
}

export interface CourseResponseDTO {
	id: string;
	title: string;
	completion: CompletionDTO;
}

export interface CourseResponsePopulatedDTO extends CourseResponseDTO {
	modules: (ModuleResponseDTO | ModuleResponsePopulatedDTO)[];
}

const coursePrismaRepository = new CoursePrismaRepository();

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
	return sendMethodNotImplemented(res);
};

export const getCourses = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};
