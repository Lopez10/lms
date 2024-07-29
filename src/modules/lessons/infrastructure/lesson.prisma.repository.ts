import { Id } from '../../../shared';
import { prisma } from '../../../shared';
import { LessonDto, LessonMapper } from '../application/lesson.mapper';
import { Lesson } from '../domain/lesson.entity';
import { LessonPortRepository } from '../domain/lesson.port.repository';

export class LessonPrismaRepository implements LessonPortRepository {
	async insert(lesson: Lesson): Promise<void> {
		const lessonDto = LessonMapper.toDto(lesson);
		await prisma.lesson.create({
			data: lessonDto,
		});
	}

	async getById(id: Id): Promise<Lesson | null> {
		const lesson: LessonDto | null = await prisma.lesson.findUnique({
			where: {
				id: id.value,
			},
		});

		if (!lesson) {
			return null;
		}

		return LessonMapper.toDomain(lesson);
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
