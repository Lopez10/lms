import { Id } from '../../../shared';
import { Module } from './module.entity';

export interface ModulePortRepository {
	insert(module: Module): Promise<void>;
	getById(id: Id): Promise<Module | null>;
	getAll(): Promise<Module[]>;
}
