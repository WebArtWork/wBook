import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book.interface';

@Component({
	selector: 'book-selector',
	templateUrl: './book-selector.component.html',
	styleUrls: ['./book-selector.component.scss'],
	imports: [SelectModule],
})
export class BookSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Book[] {
		return this._bookService.books;
	}

	constructor(private _bookService: BookService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
