export const booksectionFormComponents = {
	formId: 'booksection',
	title: 'Booksection',
	components: [
		{
			name: 'Text',
			key: 'title',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill booksection title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Select',
			key: 'template',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill book template'
				},
				{
					name: 'Items',
					value: []
				}
			]
		}
	]
};
