import { CrudDocument } from 'wacom';

export interface Booksection extends CrudDocument {
	title: string;
	template: string;
	order: number;
	data: Record<string, string>;
}
