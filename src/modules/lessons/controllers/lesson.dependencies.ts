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
