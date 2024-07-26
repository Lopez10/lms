import { User } from '../domain/user.entity';

export interface UserDto {
	id: string;
	name: string;
	email: string;
}

export class UserMapper {
	static toDto(user: User): UserDto {
		return {
			id: user.id.value,
			name: user.props.name,
			email: user.props.email.value,
		};
	}

	static toDomain(userDto: UserDto): User {
		return User.createByPrimitives(
			{
				name: userDto.name,
				email: userDto.email,
			},
			userDto.id,
		);
	}
}
