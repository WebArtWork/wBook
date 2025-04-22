import { Injectable } from '@angular/core';
import { Booksectiontemplate } from '../interfaces/booksectiontemplate.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class BooksectiontemplateService extends CrudService<Booksectiontemplate> {
	constructor() {
		super({
			name: 'booksectiontemplate',
		});
	}
}
