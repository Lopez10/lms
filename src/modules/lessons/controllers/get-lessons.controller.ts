import { Request, Response } from 'express';
import { sendOk } from '../../../shared';
import { GetLessonsUseCase } from '../application/get-lessons.use-case';
import { LESSON_DEPENDENCIES } from './lesson.dependencies';
import { LessonMapper } from '../application/lesson.mapper';

export const getLessons = async (req: Request, res: Response) => {
	const getLessonsUseCase = new GetLessonsUseCase(
		LESSON_DEPENDENCIES.lessonRepository,
	);

	const lessons = await getLessonsUseCase.run();

	const responseLessonsDto = lessons.map(LessonMapper.toDto);

	return sendOk(res, responseLessonsDto);
};
