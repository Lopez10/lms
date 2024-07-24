import { ExceptionBase } from '../exception.base';

export class DatabaseError extends ExceptionBase {
	readonly code = 'DATABASE_ERROR';
	static message = 'Database error';

	constructor(message = DatabaseError.message) {
		super(message);
	}
}

export class InsertException extends ExceptionBase {
	readonly code = 'INSERT_EXCEPTION';
	static message = 'Insert exception';

	constructor(message = InsertException.message) {
		super(message);
	}
}
