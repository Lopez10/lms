import { Id } from '../../../shared';
import { Module } from '../models/module.entity';
import { ModulePortRepository } from '../models/module.port.repository';

export class ModuleInMemoryRepository implements ModulePortRepository {
	private readonly modules: Module[] = [];

	insert(module: Module): Promise<void> {
		this.modules.push(module);

		return Promise.resolve();
	}
	getById(id: Id): Promise<Module | null> {
		const module = this.modules.find((module) => module.id.equals(id));

		return Promise.resolve(module || null);
	}
	getAll(): Promise<Module[]> {
		return Promise.resolve(this.modules);
	}
}
