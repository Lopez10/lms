export interface EntityData {
	id: string;
}

const isEntity = (v: unknown): v is Entity => {
	return v instanceof Entity;
};

export abstract class Entity implements EntityData {
	constructor(public id: string) {}

	public equals(object?: Entity): boolean {
		if (object === null || object === undefined) {
			return false;
		}

		if (this === object) {
			return true;
		}

		if (!isEntity(object)) {
			return false;
		}

		return this.id === object.id;
	}
}
