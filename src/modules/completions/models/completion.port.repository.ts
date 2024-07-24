import { Completion } from './Completion';

export interface CompletionPortRepository {
	insert(completion: Completion): Promise<void>;
}
