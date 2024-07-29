import request from 'supertest';
import { server } from '../../..';
import { UserPrimitives } from '../../../modules/users/domain/user.entity';

export function createUser(userDto: UserPrimitives) {
	return request(server).post('/users').send(userDto);
}
