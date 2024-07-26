import { Id } from '../../../shared';
import { UserPortRepository } from '../domain/user.port.repository';
import { User } from '../domain/user.entity';

export class UserInMemoryRepository implements UserPortRepository {
	private readonly users: User[] = [];

	getById(id: Id): Promise<User | null> {
		const user = this.users.find((user) => user.id.equals(id));

		return Promise.resolve(user || null);
	}

	insert(user: User): Promise<void> {
		this.users.push(user);

		return Promise.resolve();
	}
}
