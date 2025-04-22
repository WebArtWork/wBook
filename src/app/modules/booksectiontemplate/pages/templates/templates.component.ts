import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { BooksectiontemplateService } from '../../services/booksectiontemplate.service';
import { Booksectiontemplate } from '../../interfaces/booksectiontemplate.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { booksectiontemplateFormComponents } from '../../formcomponents/booksectiontemplate.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './templates.component.html',
	styleUrls: ['./templates.component.scss'],
	standalone: false
})
export class TemplatesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'booksectiontemplate',
		booksectiontemplateFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._booksectiontemplateService.setPerPage.bind(
			this._booksectiontemplateService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Booksectiontemplate>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Booksectiontemplate);

					await firstValueFrom(
						this._booksectiontemplateService.create(
							created as Booksectiontemplate
						)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Booksectiontemplate): void => {
			this._form
				.modal<Booksectiontemplate>(this.form, [], doc)
				.then((updated: Booksectiontemplate) => {
					this._core.copy(updated, doc);

					this._booksectiontemplateService.update(doc);
				});
		},
		delete: (doc: Booksectiontemplate): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this booksectiontemplate?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._booksectiontemplateService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [],
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

	rows: Booksectiontemplate[] = [];

	constructor(
		private _translate: TranslateService,
		private _booksectiontemplateService: BooksectiontemplateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._booksectiontemplateService
					.get({ page })
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
				.modalDocs<Booksectiontemplate>(create ? [] : this.rows)
				.then(async (booksectiontemplates: Booksectiontemplate[]) => {
					if (create) {
						for (const booksectiontemplate of booksectiontemplates) {
							this._preCreate(booksectiontemplate);

							await firstValueFrom(
								this._booksectiontemplateService.create(
									booksectiontemplate
								)
							);
						}
					} else {
						for (const booksectiontemplate of this.rows) {
							if (
								!booksectiontemplates.find(
									(localBooksectiontemplate) =>
										localBooksectiontemplate._id ===
										booksectiontemplate._id
								)
							) {
								await firstValueFrom(
									this._booksectiontemplateService.delete(
										booksectiontemplate
									)
								);
							}
						}

						for (const booksectiontemplate of booksectiontemplates) {
							const localBooksectiontemplate = this.rows.find(
								(localBooksectiontemplate) =>
									localBooksectiontemplate._id ===
									booksectiontemplate._id
							);

							if (localBooksectiontemplate) {
								this._core.copy(
									booksectiontemplate,
									localBooksectiontemplate
								);

								await firstValueFrom(
									this._booksectiontemplateService.update(
										localBooksectiontemplate
									)
								);
							} else {
								this._preCreate(booksectiontemplate);

								await firstValueFrom(
									this._booksectiontemplateService.create(
										booksectiontemplate
									)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(booksectiontemplate: Booksectiontemplate): void {
		delete booksectiontemplate.__created;
	}
}
