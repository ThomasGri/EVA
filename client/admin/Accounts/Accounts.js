var myLogoutFunc = function(){
	Session.set('nav-toggle', '');
}

AccountsTemplates.configure({
	onLogoutHook: myLogoutFunc
});

AccountsTemplates.addFields([
	{
		_id: 'firstName',
		type: 'text',
		display_Name: 'First Name',
		required: true
	},
	{
		_id: 'lastName',
		type: 'text',
		displayName: 'Last Name',
		required: true
	},
	{
		_id: 'university',
		type: 'text',
		displayName: 'Universität',
		required: true
	},
	{
		_id: 'profession',
		type: 'select',
		displayName: 'Profession',
		select: [
			{
				text: 'Developer',
				value: 'developer'
			},
			{
				text: 'Designer',
				value: 'designer',
			},
			{
				text: 'Other',
				value: 'other'
			}
		]
	}
]);