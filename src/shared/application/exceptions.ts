import { ExceptionBase } from '../exception.base';

export class NotFoundException extends ExceptionBase {
	readonly code = 'NOT_FOUND';
	static message = 'Not found';

	constructor(message = NotFoundException.message) {
		super(message);
	}
}
