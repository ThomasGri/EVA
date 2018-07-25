Template.StudySingle.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('studies');
  });
});

Template.StudySingle.helpers({
  getStudies(){
    return Studies.find({});
  }
});

Template.StudySingle.events({
	'click #compare_studies': function(event, template) {
	    event.preventDefault();  
	    id1= FlowRouter.getParam('id');
	    id2= $("#study").val();;
	    FlowRouter.go('/compare-studies/' + id1 + '/' + id2);
  	}
});


// Subscribe Template to Collection
Template.StudyDetails.onCreated(function(){
	var self = this;

	if(Template.instance().data['idpos'] == 1){
		this.id = new ReactiveVar(FlowRouter.getParam('id')); 
		
	} else {
		this.id = new ReactiveVar(FlowRouter.getParam('id2')); 
	}

	self.autorun(function(){
		self.subscribe('studies');
		self.subscribe('uploads');
		self.subscribe('methods');
		self.subscribe('tasks');
		self.subscribe('allUsers');
	});
});

// Find Method for the template Studies
Template.StudyDetails.helpers({

	element: ()=> {
		return Studies.findOne({_id: Template.instance().id.get()});
	},

	researchers(){
		var author = getSubdocument(Studies, "author", Meteor.users, Template.instance().id.get());
		var collaborators = getSubdocument(Studies, "collaborators", Meteor.users, Template.instance().id.get());

		var researchers = author.concat(collaborators.filter(function (item) {
		    return author.map(function(e) { return e._id; }).indexOf(item._id) < 0;
		}));

		return researchers;
	},

	counterbalancing(){
		val = Studies.findOne({_id: Template.instance().id.get()}).counter_balancing;

		if(val == 1){
			return "Complete Counterbalancing";
		} else if(val == 2){
			return "Latin Square Counterbalancing";
		} else if(val == 3){
			return "Reverse Counterbalancing";
		} else if(val == 0){
			return "No Counterbalancing";
		}
	},

	methods(){
		return getSubdocument(Studies, "methods", Methods, Template.instance().id.get());
	},

	pretest_tasks(){
		return getSubdocument(Studies, "pretest_tasks", Tasks, Template.instance().id.get());
	},

	test_tasks(){
		return getSubdocument(Studies, "test_tasks", Tasks, Template.instance().id.get());
	},

	posttest_tasks(){
		return getSubdocument(Studies, "posttest_tasks", Tasks, Template.instance().id.get());
	},


	goal_file(){
		return getAttachedFile(Studies, "goal_file", Template.instance().id.get());
	},

	question_file(){
		return getAttachedFile(Studies, "question_file", Template.instance().id.get());
	},

	method_file(){
		return getAttachedFile(Studies, "method_file", Template.instance().id.get());
	},

	practical_file(){
		return getAttachedFile(Studies, "practical_file", Template.instance().id.get());
	},

	ethical_file(){
		return getAttachedFile(Studies, "ethical_file", Template.instance().id.get());
	}

});
