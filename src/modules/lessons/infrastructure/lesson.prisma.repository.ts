import { Id } from '../../../shared';
import { prisma } from '../../../shared';
import { LessonDto, LessonMapper } from '../application/lesson.mapper';
import { Lesson } from '../domain/lesson.entity';
import { LessonPortRepository } from '../domain/lesson.port.repository';

export class LessonPrismaRepository implements LessonPortRepository {
	insert(lesson: Lesson): Promise<void> {
		throw new Error('Method not implemented.');
	}

	getById(id: Id): Promise<Lesson | null> {
		throw new Error('Method not implemented.');
	}

	async getAll(): Promise<Lesson[]> {
		const lessons: LessonDto[] = await prisma.lesson.findMany();

		return lessons.map(LessonMapper.toDomain);
	}

	async countTotalLessonByCourseId(courseId: Id): Promise<number> {
		const totalLessons = await prisma.lesson.count({
			where: {
				Module: {
					courseId: courseId.value,
				},
			},
		});

		return totalLessons;
	}
}
