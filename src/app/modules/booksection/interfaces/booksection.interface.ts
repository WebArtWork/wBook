import { CrudDocument } from 'wacom';

export interface Booksection extends CrudDocument {
	template: string;
	data: Record<string, string>;
}
