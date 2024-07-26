import { User, UserPrimitives } from '../domain/user.entity';
import { UserPortRepository } from '../domain/user.port.repository';

export class CreateUserUseCase {
	constructor(private readonly userRepository: UserPortRepository) {}

	async run(userDto: UserPrimitives): Promise<User> {
		const user = User.createByPrimitives(userDto);

		await this.userRepository.insert(user);

		return user;
	}
}
