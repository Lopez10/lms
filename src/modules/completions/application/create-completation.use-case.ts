import { Completion, CompletionPrimitives } from '../models/completion.entity';
import { CompletionPortRepository } from '../models/completion.port.repository';

export class CreateCompletationUseCase {
	constructor(
		private readonly completationRepository: CompletionPortRepository,
	) {}

	async run(createCompletionDto: CompletionPrimitives): Promise<Completion> {
		const completation = Completion.createByPrimitives(createCompletionDto);
		await this.completationRepository.insert(completation);

		return completation;
	}
}
