import {
	CompletionDto,
	CompletionMapper,
} from '../../../modules/completions/application/completion.mapper';
import { Completion } from '../../../modules/completions/models/Completion';

export class CompletionMother {
	static create(params: Partial<CompletionDto>): Completion {
		const completionDto = {
			id: 'completion-id',
			userId: 'user-id',
			lessonId: 'lesson-id',
			...params,
		};

		return CompletionMapper.toDomain(completionDto);
	}
}
