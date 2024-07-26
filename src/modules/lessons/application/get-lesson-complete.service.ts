import { Id } from '../../../shared';
import { LessonCompleteService } from '../domain/lesson.complete.service';

export class GetLessonCompleteService {
	constructor(private readonly lessonCompleteService: LessonCompleteService) {}

	async run(lessonId: string, userId: string): Promise<boolean> {
		const lessonIdVo = Id.createExisted(lessonId);
		const userIdVo = Id.createExisted(userId);
		return this.lessonCompleteService.isLessonCompleted(lessonIdVo, userIdVo);
	}
}
