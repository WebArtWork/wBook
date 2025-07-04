import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/modules/book/services/book.service';
import { Booksection } from 'src/app/modules/booksection/interfaces/booksection.interface';
import { BooksectionService } from 'src/app/modules/booksection/services/booksection.service';

@Component({
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss'],
	standalone: false
})
export class BookComponent {
	book = this._bookService.doc(this._router.url.replace('/book/', ''));

	sections: Booksection[] = [];

	today = new Date().toLocaleDateString();

	constructor(
		private _sectionService: BooksectionService,
		private _bookService: BookService,
		private _router: Router
	) {
		this._sectionService
			.get(
				{
					query: 'book = ' + this._router.url.replace('/book/', '')
				},
				{
					name: 'public'
				}
			)
			.subscribe((sections) => {
				this.sections = sections;
			});
	}
}
