import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

});

// Give the user the Normal user role.
var postSignUp = function(userId, info){
	Roles.addUsersToRoles(userId, ['normal-user', info.profile.profession]);
}

AccountsTemplates.configure({
	postSignUpHook: postSignUp
});

