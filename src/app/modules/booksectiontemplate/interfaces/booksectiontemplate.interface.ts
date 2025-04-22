import { CrudDocument } from 'wacom';

export interface Booksectiontemplate extends CrudDocument {
	name: string;
	fields: string[];
}
