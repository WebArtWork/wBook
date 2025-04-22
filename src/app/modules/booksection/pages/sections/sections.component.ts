import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BooksectionService } from '../../services/booksection.service';
import { Booksection } from '../../interfaces/booksection.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { booksectionFormComponents } from '../../formcomponents/booksection.formcomponents';
import { firstValueFrom } from 'rxjs';
import { BooksectiontemplateService } from 'src/app/modules/booksectiontemplate/services/booksectiontemplate.service';
import { Booksectiontemplate } from 'src/app/modules/booksectiontemplate/interfaces/booksectiontemplate.interface';
import { Router } from '@angular/router';
import { BookService } from 'src/app/modules/book/services/book.service';

@Component({
	templateUrl: './sections.component.html',
	styleUrls: ['./sections.component.scss'],
	standalone: false
})
export class SectionsComponent {
	columns = ['title'];

	templates: Booksectiontemplate[] = booksectionFormComponents.components[1]
		.fields[1].value as unknown as Booksectiontemplate[];

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
		paginate: this.setRows.bind(this),
		perPage: 20,
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
					const template = this.templates.find((t) =>
						doc.template
							? t._id === doc.template
							: t._id === this.book.template
					);

					(this.bookInfo.components as any) = (
						template?.fields || []
					).map((f: string) => {
						return {
							name: 'Text',
							key: f,
							fields: [
								{
									name: 'Placeholder',
									value: 'fill section ' + f
								},
								{
									name: 'Label',
									value: f.capitalize()
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
		private _templateService: BooksectiontemplateService,
		private _booksectionService: BooksectionService,
		private _translate: TranslateService,
		private _bookService: BookService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setRows();

		this._templateService.get().subscribe(() => {
			this.templates.push(...this._templateService.getDocs());
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._booksectionService.get({ page }).subscribe((rows) => {
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
	}
}
