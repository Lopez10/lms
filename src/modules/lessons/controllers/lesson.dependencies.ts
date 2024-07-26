import { COMPLETION_DEPENDENCIES } from '../../completions/controllers/completion.dependencies';
import { GetLessonCompleteService } from '../application/get-lesson-complete.service';
import { LessonCompleteService } from '../domain/lesson.complete.service';
import { LessonPrismaRepository } from '../infrastructure/lesson.prisma.repository';

export interface LessonResponseDto {
	id: string;
	title: string;
	module_id: string;
	is_completed: boolean;
}

const lessonRepository = new LessonPrismaRepository();
const lessonCompletedService = new LessonCompleteService(
	COMPLETION_DEPENDENCIES.completionPrismaRepository,
);
const getLessonCompleteService = new GetLessonCompleteService(
	lessonCompletedService,
);

export const LESSON_DEPENDENCIES = {
	lessonRepository,
	getLessonCompleteService,
};
