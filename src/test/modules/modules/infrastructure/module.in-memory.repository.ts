import { Id } from '../../../../shared';
import { Module } from '../../../../modules/modules/domain/module.entity';
import { ModulePortRepository } from '../../../../modules/modules/domain/module.port.repository';

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

	update(module: Module): Promise<void> {
		const index = this.modules.findIndex((m) => m.id.equals(module.id));
		this.modules[index] = module;

		return Promise.resolve();
	}
}
