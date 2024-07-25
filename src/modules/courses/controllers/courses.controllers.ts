import { Request, Response } from 'express';
import {
	sendBadRequest,
	sendCreated,
	sendOk,
} from '../../../shared/responses.utils';
import { ModuleResponsePopulatedDTO } from '../../modules/controllers/modules.controllers';
import { CoursePrismaRepository } from '../infrastructure/course.prisma.repository';
import { CreateCourse } from '../application/create-course.use-case';
import { GetCourseByIdUseCase } from '../application/get-course-by-id.use-case';
import { LessonPrismaRepository } from '../../lessons/infrastructure/lesson.prisma.repository';
import { CompletionPrismaRepository } from '../../completions/infrastructure/completion.prisma.repository';
import { CourseService } from '../models/course.service';
import { ModuleDto } from '../../modules/application/module.mapper';
import { Course, CoursePrimitives } from '../models/course.entity';
import { GetCoursesUseCase } from '../application/get-courses.use-case';

export interface CourseResponsePopulatedDTO
	extends CourseResponseWithStatisticsDto {
	modules: (ModuleDto | ModuleResponsePopulatedDTO)[];
}

interface CourseResponseWithStatisticsDto {
	id: string;
	title: string;
	statistics: {
		total_lessons: number;
		completed_lessons: number;
		percentage: number;
	};
}

const coursePrismaRepository = new CoursePrismaRepository();
const lessonRepository = new LessonPrismaRepository();
const completionRepository = new CompletionPrismaRepository();

const courseService = new CourseService(completionRepository, lessonRepository);

export const createCourse = async (req: Request, res: Response) => {
	try {
		const createCourseDto: CoursePrimitives = req.body;
		const createCourseUseCase = new CreateCourse(coursePrismaRepository);

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

export const getCourseById = async (req: Request, res: Response) => {
	const getCourseByIdUseCase = new GetCourseByIdUseCase(coursePrismaRepository);
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
