import { Component } from '@angular/core';
import { BookService } from 'src/app/modules/book/services/book.service';
import { Router } from '@angular/router';
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
		this._sectionService.get().subscribe((sections) => {
			this.sections = sections.sort((a, b) => {
				return a.order - b.order;
			});
		});
	}
}
