import { Completion } from '../models/Completion';
import { CompletionPortRepository } from '../models/completion.port.repository';

export interface CreateCompletionDto {
	userId: string;
	lessonId: string;
}

export interface CompletionResponseDTO {
	id: string;
	lesson_id: string;
	user_id: string;
}

export class CreateCompletationUseCase {
	constructor(
		private readonly completationRepository: CompletionPortRepository,
	) {}

	async run(
		createCompletionDto: CreateCompletionDto,
	): Promise<CompletionResponseDTO> {
		const completation = Completion.create(createCompletionDto);
		await this.completationRepository.insert(completation);

		return toDto(completation);
	}
}

function toDto(completion: Completion): CompletionResponseDTO {
	return {
		id: completion.id.value,
		lesson_id: completion.props.lessonId,
		user_id: completion.props.userId,
	};
}
