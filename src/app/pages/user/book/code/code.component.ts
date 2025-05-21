import { Component, Input } from '@angular/core';
import { Booksection } from 'src/app/modules/booksection/interfaces/booksection.interface';

@Component({
	selector: 'app-code',
	standalone: false,
	templateUrl: './code.component.html',
	styleUrl: './code.component.scss'
})
export class CodeComponent {
	@Input() section: Booksection;
}
