// Subscribe Template to Collection
Template.Tasks.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('tasks');
        self.subscribe('methods');
	});
});

// Find Method for the template Studies
Template.Tasks.helpers({
	tasks: ()=> {
		return Tasks.find({});
	}
});

Template.Tasks.events({
  'click #new_task': function(event, template) {
    event.preventDefault();  
    FlowRouter.go('new-task');
  }
});

// Method to loop Array entries of Subschemas TODO Add Linebreaks
function fillTable (collection, value){

    if(Array.isArray(value)){

        string = "";

        $.each(value, function(index, value){
            string += collection.find({_id : value}, {fields: {'name':1}}).map(function (c){ return c.name +new Spacebars.SafeString('\n'); }); 
        });

        return string;

    } else {
        return collection.find({_id : value}, {fields: {'name':1}}).map(function (c){ return c.name +"\n"; }); 
    } 
}

// Settings for reactive table
Template.Tasks.helpers({
    settings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
			    { key: 'name', label: 'Name' },

                { key: 'description', label: 'Beschreibung' },

                { key: 'methods', label: 'Methoden',
                    fn: function (value, object, key) { 
                        return fillTable(Methods, value);
                    }
                }, 

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

Template.Tasks.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    var task = this;

    // checks if the actual clicked element has the class `delete`
    if ($(event.target).hasClass("fa-edit")) {
      FlowRouter.go("/edit-task/" + task._id);
    }
    if ($(event.target).hasClass("fa-eye")) {
        FlowRouter.go("/view-task/" + task._id);
    }
  }
});
