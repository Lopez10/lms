import { Completion, CompletionPrimitives } from '../domain/completion.entity';
import { CompletionPortRepository } from '../domain/completion.port.repository';

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
