// Subscribe Template to Collection
Template.MyStudies.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('mystudies');
		self.subscribe('methods');
        self.subscribe('allUsers');

        archived_filter = new ReactiveTable.Filter('archived_filter', ["status"]);
        archived_filter.set(/^(?!.*(Archived))/);

	});
});

// Find Method for the template Studies
Template.MyStudies.helpers({
	studies: ()=> {
		return Studies.find({});
	}
});

Template.MyStudies.events({
  'click #new_study': function(event, template) {
    event.preventDefault();  
    FlowRouter.go('create-study');
  }
});

Template.MyStudies.helpers({
    settings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            filters: ["archived_filter"],
            fields: [
			    { key: 'name', label: 'Name' },
			    { key: 'description', label: 'Description' },
			    { key: 'methods', label: 'Methods',
			        fn: function (value, object, key) { 
                        return fillTable(Methods, value);
                    }
                }, 
			    { key: 'collaborators', label: 'Researchers',
			    	fn: function (value, object, key) { 

                        var author = [object.author];
                        var collaborators = object.collaborators;

                        var researchers = [];

                        if(collaborators){
                            researchers = author.concat(collaborators.filter(function (item) {
                                return author.indexOf(item) < 0;
                            }));
                        } else {
                            researchers = author;
                        }

                         string = "";
                        $.each(researchers, function(index, value){
                            string += Meteor.users.find({_id: value}).map(function (c){ return c.profile.lastName + ", " + c.profile.firstName + "  "; });
                        });

                        return string;
                    }
                }, 
			    { key: 'participants', label: 'Participants'}, 
			    { key: 'status', label: 'Status'},
			    { key: 'createdAt', label: 'Last Update',
			    	fn: function (value, object, key) { 
                        return value.getDate() + "." + value.getMonth() + "." + value.getFullYear(); // TODO Monthnames
                    }
                }, 
                { key: '_id', label: 'Actions',                    
                    fn: function (value, object, key) { 
                        
                        if(object.status === "Archived"){
                            // user is owner of the study
                            if(object.author === Meteor.userId()){
                                return new Spacebars.SafeString('<a title="Reactivate"><i class="fa fa-folder-open"></i></a><a title="View"><i class="fa fa-eye"></i></a>');
                            }
                        } else {
                            // user is owner of the study
                            if(object.author === Meteor.userId()){
                                return new Spacebars.SafeString('<a title="Edit"><i class="fa fa-edit"></i></a> <a title="View"><i class="fa fa-eye"></i></a><a title="Archive"><i class="fa fa-archive"></i></a> <a title="Delete"><i class="fa fa-trash"></i></a>');
                            }

                            // user is collaborator
                            if(object.collaborators){
                                if(object.collaborators.includes(Meteor.userId())){
                                    return new Spacebars.SafeString('<a title="Edit"><i class="fa fa-edit"></i></a><a title="View"><i class="fa fa-eye"></i></a>');
                                }
                            }
                            
                            // user is nothing. can only see.
                            return new Spacebars.SafeString('<a title="View"><i class="fa fa-eye"></i></a>');
                        }
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

Template.MyStudies.events({
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
    if ($(event.target).hasClass("fa-archive")) {
        Studies.update({_id: method._id},{$set : {status : "Archived"}});
    }
    if ($(event.target).hasClass("fa-trash")) {
       deleteConfirmation(Studies, method._id);
    }
    if ($(event.target).hasClass("fa-folder-open")) {
       Studies.update({_id: method._id},{$set : {status : "Completed"}});
    }
  },

  'change #show_archived': function(event){
        if(event.target.checked){
            archived_filter.set("");   
        } else { 
            archived_filter.set(/^(?!.*(Archived))/);
        }
  }
});