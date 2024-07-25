import { Id, prisma } from '../../../shared';
import { Completion } from '../models/completion.entity';
import { CompletionPortRepository } from '../models/completion.port.repository';

export class CompletionPrismaRepository implements CompletionPortRepository {
	async insert(completion: Completion): Promise<void> {
		await prisma.completion.create({
			data: {
				userId: completion.props.userId,
				lessonId: completion.props.lessonId.value,
			},
		});
	}

	countCompletedLessonByCourseId(courseId: Id): Promise<number> {
		const completedLessons = prisma.completion.count({
			where: {
				Lesson: {
					Module: {
						course_id: courseId.value,
					},
				},
			},
		});

		return completedLessons;
	}
}
