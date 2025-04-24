import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TemplateService {
	templates = ['code'];

	template: Record<string, string[]> = {
		code: [
			'theory',
			'code',
			'output',
			'qr_example',
			'question_code',
			'qr_code',
			'conclusion'
		]
	};
}
