import { Component, Input } from '@angular/core';
import { Booksection } from 'src/app/modules/booksection/interfaces/booksection.interface';

@Component({
	selector: 'app-html',
	standalone: false,
	templateUrl: './html.component.html',
	styleUrl: './html.component.scss'
})
export class HtmlComponent {
	@Input() section: Booksection;
}
