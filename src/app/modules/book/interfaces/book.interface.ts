import { CrudDocument } from 'wacom';

export interface Book extends CrudDocument {
	title: string;
	template: string;
}
