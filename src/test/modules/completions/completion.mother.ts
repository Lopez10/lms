import {
	CompletionDto,
	CompletionMapper,
} from '../../../modules/completions/application/completion.mapper';
import { Completion } from '../../../modules/completions/domain/completion.entity';

export class CompletionMother {
	static create(params: Partial<CompletionDto>): Completion {
		const completionDto: CompletionDto = {
			id: 'completion1',
			userId: 'userId12345',
			lessonId: 'lessonId123',
			...params,
		};

		return CompletionMapper.toDomain(completionDto);
	}
}
