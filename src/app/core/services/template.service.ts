import { Injectable } from '@angular/core';
import { TemplateFieldInterface } from '../modules/form/interfaces/component.interface';

@Injectable({
	providedIn: 'root'
})
export class TemplateService {
	templates = ['code', 'codes', 'html', 'content'];

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
		codes: ['sector', 'codes', 'conclusion'],
		html: ['sector', 'theory', 'html', 'htmlTitle', 'conclusion'],
		content: ['sector', 'content']
	};

	form: Record<string, string> = {
		html: 'Html',
		codes: 'Objects',
		content: 'Objects'
	};

	field: Record<string, TemplateFieldInterface[]> = {
		codes: [
			{
				name: 'Label',
				value: 'Codes'
			},
			{
				name: 'Fields',
				value: [
					{
						placeholder: 'Enter theory...',
						key: 'theory',
						label: 'Theory',
						type: 'textarea'
					},
					{
						placeholder: 'Enter code...',
						key: 'code',
						label: 'Code',
						type: 'textarea'
					},
					{
						placeholder: 'Enter qr_example...',
						key: 'qr_example',
						label: 'QR example'
					},
					{
						placeholder: 'Enter output...',
						key: 'output',
						label: 'Output',
						type: 'textarea'
					}
				]
			}
		],
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
