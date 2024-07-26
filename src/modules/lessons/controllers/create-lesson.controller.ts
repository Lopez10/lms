import { Request, Response } from 'express';
import { sendCreated, sendMethodNotImplemented } from '../../../shared';
import { LessonPrimitives } from '../domain/lesson.entity';
import { CreateLessonUseCase } from '../application/create-lesson.use-case';
import { LESSON_DEPENDENCIES } from './lesson.dependencies';
import { LessonMapper } from '../application/lesson.mapper';

const EMPTY_COMPLETED = false;

export const createLesson = async (req: Request, res: Response) => {
	try {
		const createLessonDto: LessonPrimitives = req.body;
		const createLessonUseCase = new CreateLessonUseCase(
			LESSON_DEPENDENCIES.lessonRepository,
		);

		const lessonCreated = await createLessonUseCase.run(createLessonDto);
		const responseLessonDto = LessonMapper.toDtoWithCompletion(
			lessonCreated,
			EMPTY_COMPLETED,
		);

		sendCreated(res, {
			message: 'Lesson created successfully',
			data: responseLessonDto,
		});
	} catch (error) {
		console.error(error);
		return sendMethodNotImplemented(res);
	}
};
