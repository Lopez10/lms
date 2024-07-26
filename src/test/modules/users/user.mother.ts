import {
	UserDto,
	UserMapper,
} from '../../../modules/users/application/user.mapper';
import { User } from '../../../modules/users/domain/user.entity';

export class UserMother {
	static create(params: Partial<UserDto>): User {
		const userDto: UserDto = {
			id: 'userId12345',
			name: 'user-name',
			email: 'user-email',
			...params,
		};

		return UserMapper.toDomain(userDto);
	}
}
