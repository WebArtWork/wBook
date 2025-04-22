import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BooksectiontemplateService } from '../../services/booksectiontemplate.service';
import { Booksectiontemplate } from '../../interfaces/booksectiontemplate.interface';

@Component({
	selector: 'booksectiontemplate-selector',
	templateUrl: './booksectiontemplate-selector.component.html',
	styleUrls: ['./booksectiontemplate-selector.component.scss'],
	imports: [SelectModule],
})
export class BooksectiontemplateSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Booksectiontemplate[] {
		return this._booksectiontemplateService.booksectiontemplates;
	}

	constructor(private _booksectiontemplateService: BooksectiontemplateService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
