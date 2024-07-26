import { Id, prisma } from '../../../shared';
import { UserMapper } from '../application/user.mapper';
import { User } from '../domain/user.entity';
import { UserPortRepository } from '../domain/user.port.repository';

export class UserPrismaRepository implements UserPortRepository {
	async getById(id: Id): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id: id.value,
			},
		});

		if (!user) {
			return null;
		}

		return UserMapper.toDomain(user);
	}
	async insert(user: User): Promise<void> {
		const userDb = UserMapper.toDto(user);

		try {
			await prisma.user.create({
				data: userDb,
			});
		} catch (error) {
			throw new Error('Error inserting user');
		}
	}
}
