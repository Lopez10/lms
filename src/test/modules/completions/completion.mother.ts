import {
	CompletionDto,
	CompletionMapper,
} from '../../../modules/completions/application/completion.mapper';
import { Completion } from '../../../modules/completions/domain/completion.entity';

export class CompletionMother {
	static create(params: Partial<CompletionDto>): Completion {
		const completionDto: CompletionDto = {
			id: 'completion1',
			userId: 'user-id',
			lessonId: 'lesson-id',
			...params,
		};

		return CompletionMapper.toDomain(completionDto);
	}
}
