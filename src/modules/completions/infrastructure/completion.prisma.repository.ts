import { prisma } from '../../../shared';
import { Completion } from '../models/Completion';
import { CompletionPortRepository } from '../models/completion.port.repository';

export class CompletionPrismaRepository implements CompletionPortRepository {
	insert(completion: Completion): Promise<void> {
		throw new Error('Method not implemented.');
	}

	countCompletedLessonByCourseId(courseId: string): Promise<number> {
		const completedLessons = prisma.completion.count({
			where: {
				Lesson: {
					Module: {
						courseId: courseId,
					},
				},
			},
		});

		return completedLessons;
	}
}
