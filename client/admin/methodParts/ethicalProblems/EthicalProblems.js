// Subscribe Template to Collection
Template.EthicalProblems.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('ethicalProblems');
	});
});

// Find Method for the template Studies
Template.EthicalProblems.helpers({
	ethicalProblems: ()=> {
		return EthicalProblems.find({});
	}
});

Template.EthicalProblems.helpers({
    settings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'name', label: 'Name' },
                { key: 'description', label: 'Description' },
                { key: '_id', label: 'Actions',                    
                    fn: function (value, object, key) { 
                        if(object.author === Meteor.userId()){
                            return new Spacebars.SafeString('<a title="Edit"><i class="fa fa-edit"></i></a><a title="View"><i class="fa fa-eye"></i></a><a title="Delete"><i class="fa fa-trash"></i></a>');
                        } else {
                            return new Spacebars.SafeString('<a title="Edit"><i class="fa fa-edit"></i></a><a title="View"><i class="fa fa-eye"></i></a>');
                        }
                    }
                }
            ]
        };
    }
});

Template.EthicalProblems.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    var method = this;

    // checks if the actual clicked element has the class `delete`
    if ($(event.target).hasClass("fa-edit")) {
      FlowRouter.go("/edit-ethicalProblem/" + method._id);
    }
    if ($(event.target).hasClass("fa-eye")) {
        FlowRouter.go("/view-ethicalProblem/" + method._id);
    }
    if ($(event.target).hasClass("fa-trash")) {
       deleteConfirmation(EthicalProblems, method._id);
    }
  },
  'click #new': function(event, template) {
    event.preventDefault();  
    FlowRouter.go('new-ethicalProblem');
  }
});