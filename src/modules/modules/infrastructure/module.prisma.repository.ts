import { Id, prisma } from '../../../shared';
import { ModulePortRepository } from '../models/module.port.repository';
import { Module } from '../models/Module';
import { ModuleMapper } from '../application/module.mapper';

export class ModulePrismaRepository implements ModulePortRepository {
	async insert(module: Module): Promise<void> {
		const moduleDb = ModuleMapper.toDto(module);
		await prisma.module.create({
			data: moduleDb,
		});
	}

	async getById(id: Id): Promise<Module | null> {
		const moduleDb = await prisma.module.findUnique({
			where: {
				id: id.value,
			},
		});

		if (!moduleDb) {
			return null;
		}

		return ModuleMapper.toDomain(moduleDb);
	}
	getAll(): Promise<Module[]> {
		throw new Error('Method not implemented.');
	}
}
