import { Id } from '../../../shared';
import { User } from './user.entity';

export interface UserPortRepository {
	getById(id: Id): Promise<User>;
	create(user: User): Promise<void>;
}
