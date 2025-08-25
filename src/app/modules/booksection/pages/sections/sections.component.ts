import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { TemplateService } from 'src/app/core/services/template.service';
import { BookService } from 'src/app/modules/book/services/book.service';
import { AlertService, CoreService } from 'wacom';
import { booksectionFormComponents } from '../../formcomponents/booksection.formcomponents';
import { Booksection } from '../../interfaces/booksection.interface';
import { BooksectionService } from '../../services/booksection.service';

@Component({
	templateUrl: './sections.component.html',
	styleUrls: ['./sections.component.scss'],
	standalone: false
})
export class SectionsComponent {
	columns = ['title', 'template', 'output'];

	templates: string[] = booksectionFormComponents.components[1].fields[1]
		.value as unknown as string[];

	book = this._bookService.doc(this._router.url.replace('/sections/', ''));

	bookInfo = {
		formId: 'booksectioninfo',
		title: 'Section information',
		components: []
	};

	form: FormInterface = this._form.getForm(
		'booksection',
		booksectionFormComponents
	);

	config = {
		num: true,
		paginate: this.setRows.bind(this),
		perPage: 20,
		pageSizeOptions: [10, 20, 50, 100],
		setPerPage: this._booksectionService.setPerPage.bind(
			this._booksectionService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Booksection>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Booksection);

					await firstValueFrom(
						this._booksectionService.create(created as Booksection)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Booksection): void => {
			this._form
				.modal<Booksection>(this.form, [], doc)
				.then((updated: Booksection) => {
					this._core.copy(updated, doc);

					this._booksectionService.update(doc);
				});
		},
		delete: (doc: Booksection): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this booksection?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._booksectionService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'edit_note',
				click: (doc: Booksection): void => {
					(this.bookInfo.components as any) = (
						this._templateService.template[
							doc.template || this.book.template
						] || []
					).map((f: string) => {
						return {
							name: this._templateService.form[f] || 'Text',
							key: f,
							fields: [
								...(this._templateService.field[f] || []),
								{
									name: 'Placeholder',
									value: 'fill section ' + f
								},
								{
									name: 'Label',
									value: f.capitalize()
								},
								{
									name: 'Textarea',
									value: true
								}
							]
						};
					});

					this._form
						.modal<
							Record<string, string>
						>(this.bookInfo, [], doc.data)
						.then((updated: Record<string, string>) => {
							delete updated['data'];

							doc.data = {
								...doc.data,
								...updated
							};

							this._booksectionService.update(doc);
						});
				}
			},
			{
				icon: 'arrow_upward',
				click: (doc: Booksection): void => {
					const index = this.rows.findIndex((d) => d._id === doc._id);

					if (index) {
						this.rows.splice(index, 1);

						this.rows.splice(index - 1, 0, doc);
					}

					for (let i = 0; i < this.rows.length; i++) {
						if (this.rows[i].order !== i) {
							this.rows[i].order = i;

							this._booksectionService.update(this.rows[i]);
						}
					}
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

	rows: Booksection[] = [];

	constructor(
		private _booksectionService: BooksectionService,
		private _templateService: TemplateService,
		private _translate: TranslateService,
		private _bookService: BookService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setRows();

		this.templates.push(...this._templateService.templates);
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._booksectionService
					.get({
						page,
						query:
							'book = ' +
							this._router.url.replace('/sections/', '')
					})
					.subscribe((rows) => {
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
				.modalDocs<Booksection>(create ? [] : this.rows)
				.then(async (booksections: Booksection[]) => {
					if (create) {
						for (const booksection of booksections) {
							this._preCreate(booksection);

							await firstValueFrom(
								this._booksectionService.create(booksection)
							);
						}
					} else {
						for (const booksection of this.rows) {
							if (
								!booksections.find(
									(localBooksection) =>
										localBooksection._id === booksection._id
								)
							) {
								await firstValueFrom(
									this._booksectionService.delete(booksection)
								);
							}
						}

						for (const booksection of booksections) {
							const localBooksection = this.rows.find(
								(localBooksection) =>
									localBooksection._id === booksection._id
							);

							if (localBooksection) {
								this._core.copy(booksection, localBooksection);

								await firstValueFrom(
									this._booksectionService.update(
										localBooksection
									)
								);
							} else {
								this._preCreate(booksection);

								await firstValueFrom(
									this._booksectionService.create(booksection)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(booksection: Booksection): void {
		delete booksection.__created;

		booksection.book = this.book._id;
	}
}
