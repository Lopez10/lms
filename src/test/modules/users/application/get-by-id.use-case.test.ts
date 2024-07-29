import { GetUserByIdUseCase } from '../../../../modules/users/application/get-user-by-id.use-case';
import { NotFoundException } from '../../../../shared/application/exceptions';
import { UserInMemoryRepository } from '../infrastructure/user.in-memory.repository';
import { UserMother } from '../user.mother';

describe('get user by id use case', () => {
	it(`
        GIVEN there is a user inserted in the repository
        WHEN I get the user by id
        THEN the user is returned successfully
    `, async () => {
		const userRepository = new UserInMemoryRepository();
		const getUserById = new GetUserByIdUseCase(userRepository);
		const id = 'userId12345';

		// GIVEN
		const user = UserMother.create({ id });
		userRepository.insert(user);

		// WHEN
		const userFound = await getUserById.run(id);

		// THEN
		expect(userFound).toBeDefined();
		expect(userFound.id).toBeDefined();
		expect(userFound.id.value).toBe(id);
	});

	it(`
        GIVEN there are no users inserted in the repository
        WHEN I get the user by id
        THEN null is returned
    `, async () => {
		const userRepository = new UserInMemoryRepository();
		const getUserById = new GetUserByIdUseCase(userRepository);

		// GIVEN
		const id = 'userId12345';

		expect.assertions(1);

		try {
			// WHEN
			await getUserById.run(id);
		} catch (error) {
			// THEN
			expect(error).toBeInstanceOf(NotFoundException);
		}
	});
});
