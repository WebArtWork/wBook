import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/modules/book/interfaces/book.interface';
import { BookService } from 'src/app/modules/book/services/book.service';
import { Booksection } from 'src/app/modules/booksection/interfaces/booksection.interface';
import { BooksectionService } from 'src/app/modules/booksection/services/booksection.service';

@Component({
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.scss'],
	standalone: false
})
export class BookComponent {
	bookId = this._router.url.replace('/book/', '');

	book: Book;

	sections: Booksection[] = [];

	today = new Date().toLocaleDateString();

	constructor(
		private _sectionService: BooksectionService,
		private _bookService: BookService,
		private _router: Router
	) {
		this._bookService
			.fetch(
				{
					_id: this.bookId
				},
				{
					name: 'public'
				}
			)
			.subscribe((book) => (this.book = book));

		this._sectionService
			.get(
				{
					query: 'book = ' + this.bookId
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
