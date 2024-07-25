import { InvalidValueObjectFormat, ValueObject } from '../../../shared';

interface EmailProps {
	value: string;
}

export class Email extends ValueObject<EmailProps> {
	private constructor(props: EmailProps) {
		super(props);
	}

	get value(): string {
		return this.props.value;
	}

	get name(): string {
		return this.value.substring(0, this.props.value?.lastIndexOf('@'));
	}

	get domain(): string {
		return this.value.substring(this.props.value?.lastIndexOf('@') + 1);
	}

	static format(email: string): string {
		return email.trim().toLowerCase();
	}

	public static create(email: string): Email {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isEmailValid = emailRegex.test(email);
		if (!isEmailValid) {
			throw new InvalidValueObjectFormat('Invalid email format');
		}
		return new Email({ value: Email.format(email) });
	}
}
