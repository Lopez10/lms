import { Id } from '../../../shared';
import { LessonCompleteService } from '../domain/lesson.complete.service';

export class GetLessonCompleteService {
	constructor(private readonly lessonCompleteService: LessonCompleteService) {}

	async run(lessonId: Id, userId: Id): Promise<boolean> {
		return this.lessonCompleteService.isLessonCompleted(lessonId, userId);
	}
}
