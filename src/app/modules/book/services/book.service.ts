import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class BookService extends CrudService<Book> {
	constructor() {
		super({
			name: 'book',
		});
	}
}
