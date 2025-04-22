import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BooksectionService } from '../../services/booksection.service';
import { Booksection } from '../../interfaces/booksection.interface';

@Component({
	selector: 'booksection-selector',
	templateUrl: './booksection-selector.component.html',
	styleUrls: ['./booksection-selector.component.scss'],
	imports: [SelectModule],
})
export class BooksectionSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Booksection[] {
		return this._booksectionService.booksections;
	}

	constructor(private _booksectionService: BooksectionService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
