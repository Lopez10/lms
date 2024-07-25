import { Email } from './email.value-object';

interface UserProps {
	name: string;
	email: Email;
}

export interface UserPrimitives {
	name: string;
	email: string;
}

export class User {
	private constructor(private props: UserProps) {}

	static create(props: UserProps): User {
		const user = new User(props);
		return user;
	}

	static createByPrimitives(primitives: UserPrimitives): User {
		return User.create({
			name: primitives.name,
			email: Email.create(primitives.email),
		});
	}
}
