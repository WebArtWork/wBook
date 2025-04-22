import { Injectable } from '@angular/core';
import { Booksection } from '../interfaces/booksection.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class BooksectionService extends CrudService<Booksection> {
	constructor() {
		super({
			name: 'booksection',
		});
	}
}
