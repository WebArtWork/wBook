import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormService } from '../../modules/form/form.service';

interface Interface {}

@Component({
	templateUrl: './objects.component.html',
	styleUrls: ['./objects.component.scss'],
	standalone: false
})
export class ObjectsComponent implements OnInit {
	@ViewChild('templateRef', { static: true })
	templateRef: TemplateRef<Interface>;

	constructor(private _form: FormService) {}

	ngOnInit(): void {
		this._form.addTemplateComponent<Interface>('Objects', this.templateRef);
	}

	addTag(data: any): void {
		data.submition[data.key] = data.submition[data.key] || [];

		const document: Record<string, unknown> = {};

		for (const field of data.field.Fields) {
			document[field.key] = field.__value;

			field.__value = '';
		}

		data.submition[data.key].push(document);

		data.wChange();
	}
}
