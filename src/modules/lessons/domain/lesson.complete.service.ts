import { CompletionPortRepository } from '../../completions/domain/completion.port.repository';

export class LessonCompleteService {
	constructor(
		private readonly completionRepository: CompletionPortRepository,
	) {}

    isLessonCompleted(lessonId: string, userId: string): Promise<boolean> {
        return this.completionRepository.countCompletedLessonByCourseId
}
