import { CrudDocument } from 'wacom';

export interface Booksection extends CrudDocument {
	book: string;
	title: string;
	template: string;
	order: number;
	data: Record<string, string>;
}
