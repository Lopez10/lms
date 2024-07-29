import { CreateUserUseCase } from '../../../../modules/users/application/create-user.use-case';
import { UserInMemoryRepository } from '../infrastructure/user.in-memory.repository';

describe('create user use case', () => {
	it(`
        GIVEN there are a name and email
        WHEN I create a user
        THEN the user is created successfully
    `, async () => {
		const userRepository = new UserInMemoryRepository();
		const createUser = new CreateUserUseCase(userRepository);

		// GIVEN
		const name = 'user name';
		const email = 'email@example.com';

		// WHEN
		const user = await createUser.run({ name, email });

		// THEN
		expect(user).toBeDefined();
		expect(user.id).toBeDefined();
		expect(user.props.name).toBe(name);
		expect(user.props.email.value).toBe(email);
	});
});
