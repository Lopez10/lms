import { Request, Response } from 'express';
import { sendMethodNotImplemented } from '../../../shared/responses.utils';
import { LessonPrismaRepository } from '../infrastructure/lesson.prisma.repository';

export interface LessonResponseDto {
	id: string;
	title: string;
	module_id: string;
	is_completed: boolean;
}

const lessonRepository = new LessonPrismaRepository();

export const LESSON_DEPENDENCIES = {
	lessonRepository,
};

export const createLesson = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};

export const getLessonById = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};

export const getLessons = async (req: Request, res: Response) => {
	return sendMethodNotImplemented(res);
};
