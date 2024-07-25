import { Request, Response } from 'express';
import { sendOk } from '../../../shared';
import { GetLessonByIdUseCase } from '../application/get-lesson-by-id.use-case';
import { LESSON_DEPENDENCIES } from './lesson.dependencies';
import { LessonMapper } from '../application/lesson.mapper';

export const getLessonById = async (req: Request, res: Response) => {
	const getLessonByIdUseCase = new GetLessonByIdUseCase(
		LESSON_DEPENDENCIES.lessonRepository,
	);

	const { id } = req.params;

	const lesson = await getLessonByIdUseCase.run(id);
	const responseLessonDto = LessonMapper.toDto(lesson);

	return sendOk(res, responseLessonDto);
};
