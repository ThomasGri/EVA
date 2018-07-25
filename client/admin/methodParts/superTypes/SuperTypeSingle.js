// Subscribe Template to Collection
Template.SuperTypeSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('superTypes');
	});
});

// Find Method for the template Studies
Template.SuperTypeSingle.helpers({
	element: ()=> {
		var id = FlowRouter.getParam('id');

		return SuperTypes.findOne({_id: id});
	},
	evaluation_file: ()=>{
		return getAttachedFile(Tasks, "evaluation_file");
	},
});
