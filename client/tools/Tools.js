// Subscribe Template to Collection
Template.Tools.onCreated(function(){
	var self = this;
	self.autorun(function(){
        self.subscribe('tools');
	});
});

// Find Method for the template Studies
Template.Tools.helpers({
	tools: ()=> {
		return Tools.find({});
	}
});

Template.Tools.events({
  'click #new_tool': function(event, template) {
    event.preventDefault();  
    FlowRouter.go('new-tool');
  }
});

// Settings for reactive table
Template.Tools.helpers({
    settings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [ 
                { key: 'name', label: 'Name' },
                
                { key: 'description', label: 'Desciption' },
                
                { key: 'url', label: 'Url'},

                { key: '_id', label: 'Actions',                    
                    fn: function (value, object, key) { 
                        if(object.author === Meteor.userId()){
                            return new Spacebars.SafeString('<a title="Edit"><i class="fa fa-edit"></i></a><a title="View"><i class="fa fa-eye"></i></a> <a title="Delete"><i class="fa fa-trash"></i></a>');
                        } else {
                            return new Spacebars.SafeString('<a title="Edit"><i class="fa fa-edit"></i></a><a title="View"><i class="fa fa-eye"></i></a>');
                        }
                    }
                }
			]
        };
    }
});

Template.Tools.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    var tool = this;

    // checks if the actual clicked element has the class `delete`
    if ($(event.target).hasClass("fa-edit")) {
      FlowRouter.go("/edit-tool/" + tool._id);
    }
    if ($(event.target).hasClass("fa-eye")) {
        FlowRouter.go("/view-tool/" + tool._id);
    }
    if ($(event.target).hasClass("fa-trash")) {
       deleteConfirmation(Tools, tool._id);
    }    
  }
});
