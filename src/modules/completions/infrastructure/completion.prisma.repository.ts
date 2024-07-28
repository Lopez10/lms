import { Id, prisma } from '../../../shared';
import { CompletionMapper } from '../application/completion.mapper';
import { Completion } from '../domain/completion.entity';
import { CompletionPortRepository } from '../domain/completion.port.repository';

export class CompletionPrismaRepository implements CompletionPortRepository {
	async getByLessonId(lessonId: Id): Promise<Completion | null> {
		const completion = await prisma.completion.findFirst({
			where: {
				lessonId: lessonId.value,
			},
		});

		if (!completion) {
			return null;
		}

		return CompletionMapper.toDomain(completion);
	}

	async insert(completion: Completion): Promise<void> {
		await prisma.completion.create({
			data: {
				userId: completion.props.userId.value,
				lessonId: completion.props.lessonId.value,
			},
		});
	}

	countCompletedLessonByCourseId(courseId: Id): Promise<number> {
		const completedLessons = prisma.completion.count({
			where: {
				Lesson: {
					Module: {
						courseId: courseId.value,
					},
				},
			},
		});

		return completedLessons;
	}
}
