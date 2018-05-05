// Subscribe Template to Collection
Template.Studies.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('studies');
		self.subscribe('methods');
        self.subscribe('allUsers');
	});
});

// Find Method for the template Studies
Template.Studies.helpers({
	studies: ()=> {
		return Studies.find({});
	}
});

Template.Studies.events({
  'click #new_study': function(event, template) {
    event.preventDefault();  
    FlowRouter.go('new-study');
  }
});

Template.Studies.helpers({
    settings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
			    { key: 'name', label: 'Name' },
			    { key: 'description', label: 'Description' },
			    { key: 'methods', label: 'Methods',
			        fn: function (value, object, key) { 
                        return fillTable(Methods, value);
                    }
                }, 
			     /** Owner shall be listed as Researcher.
                    { key: 'author', label: 'Owner',
			    	fn: function (value, object, key) { 
                        return Meteor.users.find({_id: value}).map(function (c){ return c.profile.lastName + ", " + c.profile.firstName; });
                    }
                }, **/
			    { key: 'editors', label: 'Researchers',
			    	fn: function (value, object, key) { 
                        return fillTable(Methods, value);
                    }
                }, 
			    { key: 'participants', label: 'Participants' }, 
			    { key: 'status', label: 'Status'},
			    { key: 'createdAt', label: 'Last Update',
                    fn: function (value, object, key) { 
                        return value.getDate() + "." + value.getMonth() + "." + value.getFullYear(); // TODO Monthnames
                    }
                }, 
                { key: '_id', label: 'Aktionen',                    
                    fn: function (value, object, key) { 

                        // user is owner of the study
                        if(object.author === Meteor.userId()){
                            return new Spacebars.SafeString('<i class="fa fa-edit"></i><i class="fa fa-eye"></i>');
                        }

                        // user is collaborator
                        if(object.collaborators){
                            if(object.collaborators.includes(Meteor.userId())){
                                return new Spacebars.SafeString('<i class="fa fa-edit"></i><i class="fa fa-eye"></i>');
                            }
                        }
                        
                        // user is nothing. can only see.
                        return new Spacebars.SafeString('<i class="fa fa-eye"></i>');
                    }
                }
			]
        };
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

Template.Studies.events({
  'click .reactive-table tbody tr': function (event) {
    event.preventDefault();
    var method = this;

    // checks if the actual clicked element has the class `delete`
    if ($(event.target).hasClass("fa-edit")) {
      FlowRouter.go("/edit-study/" + method._id);
    }
    if ($(event.target).hasClass("fa-eye")) {
        FlowRouter.go("/view-study/" + method._id);
    }
  }
});