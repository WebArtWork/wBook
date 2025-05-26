import { Injectable } from '@angular/core';
import { TemplateFieldInterface } from '../modules/form/interfaces/component.interface';

@Injectable({
	providedIn: 'root'
})
export class TemplateService {
	templates = ['code', 'html', 'content'];

	template: Record<string, string[]> = {
		code: [
			'sector',
			'theory',
			'code',
			'qr_example',
			'output',
			'conclusion',
			'question_code',
			'qr_code',
			'quiz'
		],
		html: ['sector', 'theory', 'html', 'htmlTitle', 'conclusion'],
		content: ['sector', 'content']
	};

	form: Record<string, string> = {
		html: 'Html',
		content: 'Objects'
	};

	field: Record<string, TemplateFieldInterface[]> = {
		content: [
			{
				name: 'Label',
				value: 'Content'
			},
			{
				name: 'Fields',
				value: [
					{
						placeholder: 'Enter sector...',
						key: 'sector',
						label: 'Sector'
					},
					{
						placeholder: 'Enter page...',
						key: 'page',
						label: 'Page'
					}
				]
			}
		]
	};
}
