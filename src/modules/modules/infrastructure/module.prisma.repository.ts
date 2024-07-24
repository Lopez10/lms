import { Id, prisma } from '../../../shared';
import { ModulePortRepository } from '../models/module.port.repository';
import { Module } from '../models/Module';
import { Module as ModuleDb } from '@prisma/client';

export class ModulePrismaRepository implements ModulePortRepository {
	async insert(module: Module): Promise<void> {
		const moduleDb: ModuleDb = {
			id: module.id.value,
			title: module.props.title,
			courseId: module.props.courseId.value,
			moduleId: module.props.moduleId.value,
			isRootModule: module.props.isRootModule,
		};
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

		return Module.create(
			{
				title: moduleDb.title,
				courseId: Id.createExisted(moduleDb.courseId),
				moduleId: Id.createExisted(moduleDb.moduleId),
				isRootModule: moduleDb.isRootModule,
			},
			Id.createExisted(moduleDb.id),
		);
	}
	getAll(): Promise<Module[]> {
		throw new Error('Method not implemented.');
	}
}
