// Subscribe Template to Collection
Template.CategoryTypeSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('categoryTypes');
	});
});

// Find Method for the template Studies
Template.CategoryTypeSingle.helpers({
	element: ()=> {
		var id = FlowRouter.getParam('id');

		return CategoryTypes.findOne({_id: id});
	},
	evaluation_file: ()=>{
		return getAttachedFile(Tasks, "evaluation_file");
	},
});
