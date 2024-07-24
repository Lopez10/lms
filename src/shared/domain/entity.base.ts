const isEntity = (v: unknown): v is Entity<unknown> => {
	return v instanceof Entity;
};

export abstract class Entity<T> {
	protected readonly id: string;
	public readonly props: T;

	constructor(props: T, id?: string) {
		this.id = id ? id : '';
		this.props = props;
	}

	public equals(object?: Entity<T>): boolean {
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
