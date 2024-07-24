import { ExceptionBase } from '../exception.base';

export class InvalidLength extends ExceptionBase {
	readonly code = 'INVALID_ID_LENGTH';
	static message = 'Invalid length';

	constructor(message = InvalidLength.message) {
		super(message);
	}
}

export class InvalidCharacter extends ExceptionBase {
	readonly code = 'INVALID_CHARACTER';
	static message = 'Invalid character';

	constructor(message = InvalidCharacter.message) {
		super(message);
	}
}
