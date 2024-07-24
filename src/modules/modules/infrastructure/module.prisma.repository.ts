import { Id } from '../../../shared';
import { ModulePortRepository } from '../models/module.port.repository';
import { Module } from '../models/Module';
import { Module as ModuleDb } from '@prisma/client';

export class ModulePrismaRepository implements ModulePortRepository {
	insert(module: Module): Promise<void> {
		throw new Error('Method not implemented.');
	}
	getById(id: Id): Promise<Module | null> {
		throw new Error('Method not implemented.');
	}
	getAll(): Promise<Module[]> {
		throw new Error('Method not implemented.');
	}
}
