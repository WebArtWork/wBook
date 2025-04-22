import { CrudDocument } from 'wacom';

export interface Booksection extends CrudDocument {
	template: string;
	order: number;
	data: Record<string, string>;
}
