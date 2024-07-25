interface UserProps {
	name: string;
	email: string;
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
			email: primitives.email,
		});
	}
}
