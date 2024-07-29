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

	const lessonsCompleted = await Promise.all(
		lessons.map(async (lesson) => {
			const isLessonCompleted =
				await LESSON_DEPENDENCIES.getLessonCompleteService.run(lesson.id.value);

			return LessonMapper.toDtoWithCompletion(lesson, isLessonCompleted);
		}),
	);

	return sendOk(res, lessonsCompleted);
};
