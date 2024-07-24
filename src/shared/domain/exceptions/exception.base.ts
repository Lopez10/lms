export interface SerializedException {
	message: string;
	code: string;
}

export abstract class ExceptionBase extends Error {
	abstract code: string;

	constructor(readonly message: string) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
	}

	toJSON(): SerializedException {
		return {
			message: this.message,
			code: this.code,
		};
	}
}
