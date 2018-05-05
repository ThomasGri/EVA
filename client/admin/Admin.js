// example role check
Template.Admin.helpers({
	admin: function(){
		return Roles.userIsInRole(Meteor.userId(), 'admin');
	}
})