import { Completion, CompletionPrimitives } from '../models/completion.entity';
import { CompletionPortRepository } from '../models/completion.port.repository';
import { CompletionDto, CompletionMapper } from './completion.mapper';

export class CreateCompletationUseCase {
	constructor(
		private readonly completationRepository: CompletionPortRepository,
	) {}

	async run(createCompletionDto: CompletionPrimitives): Promise<CompletionDto> {
		const completation = Completion.createByPrimitives(createCompletionDto);
		await this.completationRepository.insert(completation);

		return CompletionMapper.toDto(completation);
	}
}
