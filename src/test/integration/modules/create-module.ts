import request from 'supertest';
import { server } from '../../..';
import { ModulePrimitives } from '../../../modules/modules/domain/module.entity';

export function createModule(moduleDto: ModulePrimitives) {
	return request(server).post('/modules').send(moduleDto);
}
