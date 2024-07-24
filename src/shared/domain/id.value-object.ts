import { InvalidCharacter, InvalidLength } from './exceptions';
import { ValueObject } from './value-object.base';

export interface IdProps {
	value: string;
}

const abc = 'abcdefghijklmnopqrstuvwxyz';
const letters = abc.concat(abc.toUpperCase());

const ALLOWED_CHARS = `0123456789${letters}`;

const NUMBER_OF_CODEPOINTS = ALLOWED_CHARS.length;
const CODESIZE = 11;

export class Id extends ValueObject<IdProps> {
	get value(): string {
		return this.props.value;
	}

	private constructor(props: IdProps) {
		super(props);
	}

	public static generateId(): Id {
		let randomChars = letters.charAt(randomWithMax(letters.length));
		for (let i = 1; i < CODESIZE; i += 1) {
			randomChars += ALLOWED_CHARS.charAt(randomWithMax(NUMBER_OF_CODEPOINTS));
		}

		return new Id({ value: randomChars });
	}

	public static createExisted(id: string): Id {
		if (id.length !== CODESIZE) {
			throw new InvalidLength('Invalid id length');
		}

		for (let i = 0; i < id.length; i += 1) {
			if (!ALLOWED_CHARS.includes(id[i])) {
				throw new InvalidCharacter('Invalid character in id');
			}
		}

		return new Id({ value: id });
	}
}

function randomWithMax(max: number) {
	return Math.floor(Math.random() * max);
}
