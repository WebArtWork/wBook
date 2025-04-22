import { CrudDocument } from 'wacom';

export interface Book extends CrudDocument {
	template: string;
}
