var myLogoutFunc = function(){
	Session.set('nav-toggle', '');
	FlowRouter.go('');
}

AccountsTemplates.configure({
	onLogoutHook: myLogoutFunc,
 //	enforceEmailVerification: true,
  	sendVerificationEmail:true,

  	overrideLoginErrors: false,

 	showForgotPasswordLink: true,
  	showResendVerificationEmailLink: true,
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
	}
]);