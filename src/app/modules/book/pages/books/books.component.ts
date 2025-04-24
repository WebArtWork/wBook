import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { bookFormComponents } from '../../formcomponents/book.formcomponents';
import { firstValueFrom } from 'rxjs';
import { TemplateService } from 'src/app/core/services/template.service';

@Component({
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss'],
	standalone: false
})
export class BooksComponent {
	columns = ['title'];

	form: FormInterface = this._form.getForm('book', bookFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._bookService.setPerPage.bind(this._bookService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Book>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Book);

					await firstValueFrom(
						this._bookService.create(created as Book)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Book): void => {
			this._form.modal<Book>(this.form, [], doc).then((updated: Book) => {
				this._core.copy(updated, doc);

				this._bookService.update(doc);
			});
		},
		delete: (doc: Book): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this book?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._bookService.delete(doc));

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'chrome_reader_mode',
				hrefFunc: (doc: Book): string => {
					return '/book/' + doc._id;
				}
			},
			{
				icon: 'view_sidebar',
				hrefFunc: (doc: Book): string => {
					return '/sections/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Book): void => {
					this._form.modalUnique<Book>('book', 'url', doc);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	rows: Book[] = [];

	constructor(
		private _templateService: TemplateService,
		private _translate: TranslateService,
		private _bookService: BookService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();

		(
			bookFormComponents.components[2].fields[1]
				.value as unknown as Array<string>
		).push(...this._templateService.templates);
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._bookService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Book>(create ? [] : this.rows)
				.then(async (books: Book[]) => {
					if (create) {
						for (const book of books) {
							this._preCreate(book);

							await firstValueFrom(
								this._bookService.create(book)
							);
						}
					} else {
						for (const book of this.rows) {
							if (
								!books.find(
									(localBook) => localBook._id === book._id
								)
							) {
								await firstValueFrom(
									this._bookService.delete(book)
								);
							}
						}

						for (const book of books) {
							const localBook = this.rows.find(
								(localBook) => localBook._id === book._id
							);

							if (localBook) {
								this._core.copy(book, localBook);

								await firstValueFrom(
									this._bookService.update(localBook)
								);
							} else {
								this._preCreate(book);

								await firstValueFrom(
									this._bookService.create(book)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(book: Book): void {
		delete book.__created;
	}
}
