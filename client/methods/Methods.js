// Subscribe Template to Collection
Template.Methods.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('methods');
        self.subscribe('categoryTypes');
        self.subscribe('dataTypes');
        self.subscribe('ethicalProblems');
        self.subscribe('interpretations');
        self.subscribe('practicalProblems');
        self.subscribe('presentations');
        self.subscribe('superTypes');
        self.subscribe('tools');
	});
});

// Find Method for the template Studies
Template.Methods.helpers({
	methods: ()=> {
		return Methods.find({});
	}
});

Template.Methods.events({
  'click #new_method': function(event, template) {
    event.preventDefault();  
    FlowRouter.go('new-method');
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
Template.Methods.helpers({
    settings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
			    { key: 'name', label: 'Name' },
			    
                { key: 'super_type', label: 'Typ', 
                    fn: function (value, object, key) { 
                        return fillTable(SuperTypes, value); 
                    }
                },
                
                { key: 'category_type', label: 'Category', 
                    fn: function (value, object, key) { 
                       return fillTable(CategoryTypes, value);
                    }
                    
                },
                
                { key: 'description', label: 'Description' },
                
                { key: 'gathered_data_type', label: 'Datatype', 
                    fn: function (value, object, key) { 
                        return fillTable(DataTypes, value);
                    }
                },
                
                { key: '_id', label: 'Actions',                    
                    fn: function (value, object, key) { 
                        if(object.author === Meteor.userId()){
                            return new Spacebars.SafeString('<a title="Edit"><i class="fa fa-edit"></i></a><a title="View"><i class="fa fa-eye"></i></a><a title="Delete"><i class="fa fa-trash"></i></a>');
                        } else {
                            return new Spacebars.SafeString('<a title="Edit"><i class="fa fa-edit"></i></a> <a title="View"><i class="fa fa-eye"></i></a>');
                        }
                    }
                }
			]
        };
    }
});

Template.Methods.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    var method = this;

    // checks if the actual clicked element has the class `delete`
    if ($(event.target).hasClass("fa-edit")) {
      FlowRouter.go("/edit-method/" + method._id);
    }
    if ($(event.target).hasClass("fa-eye")) {
        FlowRouter.go("/view-method/" + method._id);
    }
    if ($(event.target).hasClass("fa-trash")) {
        deleteConfirmation(Methods, method._id);
    }
  }
});
