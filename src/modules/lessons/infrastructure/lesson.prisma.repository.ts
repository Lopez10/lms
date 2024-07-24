import { Id } from '../../../shared';
import { prisma } from '../../../shared';
import { Lesson } from '../models/Lesson';
import { LessonPortRepository } from '../models/lesson.port.repository';

export class LessonPrismaRepository implements LessonPortRepository {
	insert(lesson: Lesson): Promise<void> {
		throw new Error('Method not implemented.');
	}
	getById(id: Id): Promise<Lesson | null> {
		throw new Error('Method not implemented.');
	}
	getAll(): Promise<Lesson[]> {
		throw new Error('Method not implemented.');
	}
	countTotalLessonByCourseId(courseId: Id): Promise<number> {
		const totalLessons = prisma.lesson.count({
			where: {
				Module: {
					courseId: courseId.value,
				},
			},
		});

		return totalLessons;
	}
}
