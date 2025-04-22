export const bookFormComponents = {
	formId: 'book',
	title: 'Book',
	components: [
		{
			name: 'Text',
			key: 'title',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill book title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill book description'
				},
				{
					name: 'Label',
					value: 'Description'
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
