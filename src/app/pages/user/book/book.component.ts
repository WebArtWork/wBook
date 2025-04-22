import { Component } from '@angular/core';
import { UserService } from 'src/app/modules/user/services/user.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
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

	constructor(
		private _sectionService: BooksectionService,
		private _bookService: BookService,
		private _router: Router
	) {
		this._sectionService.get().subscribe((sections) => {
			this.sections = sections;
		});
	}
}
