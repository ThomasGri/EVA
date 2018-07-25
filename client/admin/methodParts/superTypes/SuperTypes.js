// Subscribe Template to Collection
Template.SuperTypes.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('superTypes');
	});
});

// Find Method for the template Studies
Template.SuperTypes.helpers({
	superTypes: ()=> {
		return SuperTypes.find({});
	}
});

Template.SuperTypes.helpers({
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

Template.SuperTypes.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    var method = this;

    // checks if the actual clicked element has the class `delete`
    if ($(event.target).hasClass("fa-edit")) {
      FlowRouter.go("/edit-superType/" + method._id);
    }
    if ($(event.target).hasClass("fa-eye")) {
        FlowRouter.go("/view-superType/" + method._id);
    }
    if ($(event.target).hasClass("fa-trash")) {
       deleteConfirmation(SuperTypes, method._id);
    }
  },
  'click #new': function(event, template) {
    event.preventDefault();  
    FlowRouter.go('new-superType');
  }
});