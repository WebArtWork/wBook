import { Component, Input } from '@angular/core';
import { Booksection } from 'src/app/modules/booksection/interfaces/booksection.interface';

interface Obj {
	sector: string;
	page: string;
}

@Component({
	selector: 'app-content',
	standalone: false,
	templateUrl: './content.component.html',
	styleUrl: './content.component.scss'
})
export class ContentComponent {
	@Input() section: Booksection;

	get objects(): Obj[] {
		return (this.section.data['content'] as unknown as Obj[]) || [];
	}
}
