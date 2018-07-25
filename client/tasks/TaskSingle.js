var id = "";

// Subscribe Template to Collection
Template.TaskSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		id = FlowRouter.getParam('id');
		self.subscribe('tasks');
		self.subscribe('uploads');
		self.subscribe('methods');
	});
});

// Find Method for the template Studies
Template.TaskSingle.helpers({
	element: ()=> {
		return Tasks.findOne({_id: id});
	},

	file: ()=>{
		return getAttachedFile(Tasks, "file");
	},

	evaluation_file: ()=>{
		return getAttachedFile(Tasks, "evaluation_file");
	},

	methods: ()=>{
		return getSubdocument(Tasks, "methods", Methods);
	}
});

