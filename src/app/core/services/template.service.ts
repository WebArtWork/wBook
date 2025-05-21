import { Injectable } from '@angular/core';

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
		html: ['html'],
		content: ['content']
	};

	form: Record<string, string> = {
		html: 'Html',
		content: 'Objects'
	};
}
