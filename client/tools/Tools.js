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
                
                { key: 'description', label: 'Beschreibung' },
                
                { key: 'url', label: 'Link'},

                { key: '_id', label: 'Aktionen',                    
                    fn: function (value, object, key) { 
                        return new Spacebars.SafeString('<i class="fa fa-edit"></i><i class="fa fa-eye"></i>')
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
  }
});
