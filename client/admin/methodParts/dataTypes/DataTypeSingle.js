// Subscribe Template to Collection
Template.DataTypeSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('dataTypes');
	});
});

// Find Method for the template Studies
Template.DataTypeSingle.helpers({
	element: ()=> {
		var id = FlowRouter.getParam('id');

		return DataTypes.findOne({_id: id});
	},
	evaluation_file: ()=>{
		return getAttachedFile(Tasks, "evaluation_file");
	},
});
