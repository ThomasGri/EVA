// Subscribe Template to Collection
Template.CategoryTypes.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('categoryTypes');
	});
});

// Find Method for the template Studies
Template.CategoryTypes.helpers({
	categoryTypes: ()=> {
		return CategoryTypes.find({});
	}
});

Template.CategoryTypes.helpers({
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

Template.CategoryTypes.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    var method = this;

    // checks if the actual clicked element has the class `delete`
    if ($(event.target).hasClass("fa-edit")) {
      FlowRouter.go("/edit-categoryType/" + method._id);
    }
    if ($(event.target).hasClass("fa-eye")) {
        FlowRouter.go("/view-categoryType/" + method._id);
    }
    if ($(event.target).hasClass("fa-trash")) {
      deleteConfirmation(CategoryTypes, method._id);
    }
  },
  'click #new': function(event, template) {
    event.preventDefault();  
    FlowRouter.go('new-categoryType');
  }
});