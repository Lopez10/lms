import { Entity, Id } from '../../../shared';
import { Email } from './email.value-object';

interface UserProps {
	name: string;
	email: Email;
}

export interface UserPrimitives {
	name: string;
	email: string;
}

export class User extends Entity<UserProps> {
	private constructor(props: UserProps, id?: Id) {
		super(props, id);
	}

	static create(props: UserProps, id?: Id): User {
		const user = new User(props, id);
		return user;
	}

	static createByPrimitives(primitives: UserPrimitives, id?: string): User {
		return User.create(
			{
				name: primitives.name,
				email: Email.create(primitives.email),
			},
			id ? Id.createExisted(id) : Id.generateId(),
		);
	}
}
