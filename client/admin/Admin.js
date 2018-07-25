
Template.Admin.onCreated(function(){
	this.selection = new ReactiveVar(0);
});

Template.Admin.onRendered(function(){
    $('.js-example-basic-single').select2();
});

Template.Admin.events({
	'change .js-example-basic-single': function() {
		//console.log($('.js-example-basic-single').val());
		Template.instance().selection.set($('.js-example-basic-single').val());
	}
});


// example role check
Template.Admin.helpers({
	// Determine if the user is an admin.
	admin: function(){
		return Roles.userIsInRole(Meteor.userId(), 'admin');
	},

	// Determine which Template to show.
	typeToEdit: function(){

		value = Template.instance().selection.get();

		if(value == 0){
			return Template.CategoryTypes; // return template 1
		} else if(value == 1){
			return Template.DataTypes; // return template 2
		} else if(value == 2){
			return Template.EthicalProblems; // return empty template
		} else if(value == 3){
			return Template.PracticalProblems; // return empty template
		} else if(value == 4){
			return Template.SuperTypes; // return empty template
		} else {
			return null; // return empty template (fallback)
		}
		
	}
})