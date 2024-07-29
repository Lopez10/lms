import { Id, prisma } from '../../../shared';
import { ModulePortRepository } from '../domain/module.port.repository';
import { Module } from '../domain/module.entity';
import { ModuleMapper } from '../application/module.mapper';
import { Module as ModuleDb } from '@prisma/client';

export class ModulePrismaRepository implements ModulePortRepository {
	async insert(module: Module): Promise<void> {
		const moduleDb: ModuleDb = ModuleMapper.toDto(module);
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
	async getAll(): Promise<Module[]> {
		const modulesDb = await prisma.module.findMany();

		return modulesDb.map(ModuleMapper.toDomain);
	}
}
