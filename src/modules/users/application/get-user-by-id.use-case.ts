import { Id } from '../../../shared';
import { NotFoundException } from '../../../shared/application/exceptions';
import { User } from '../domain/user.entity';
import { UserPortRepository } from '../domain/user.port.repository';

export class GetUserByIdUseCase {
	constructor(private readonly userRepository: UserPortRepository) {}

	async run(id: string): Promise<User> {
		const userId = Id.createExisted(id);
		const user = await this.userRepository.getById(userId);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		return user;
	}
}
