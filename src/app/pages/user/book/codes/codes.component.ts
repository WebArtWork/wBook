import { Component, Input } from '@angular/core';
import { Booksection } from 'src/app/modules/booksection/interfaces/booksection.interface';

@Component({
	selector: 'app-codes',
	standalone: false,
	templateUrl: './codes.component.html',
	styleUrl: './codes.component.scss'
})
export class CodesComponent {
	@Input() section: Booksection;
}
