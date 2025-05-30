import { Component, Input } from '@angular/core';
import { Booksection } from 'src/app/modules/booksection/interfaces/booksection.interface';

interface Code {
	theory: string;
	code: string;
	qr_example: string;
	output: string;
}

@Component({
	selector: 'app-codes',
	standalone: false,
	templateUrl: './codes.component.html',
	styleUrl: './codes.component.scss'
})
export class CodesComponent {
	@Input() section: Booksection;

	get codes(): Code[] {
		return (this.section.data['codes'] as unknown as Code[]) || [];
	}
}
