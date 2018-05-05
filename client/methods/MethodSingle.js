// Subscribe Template to Collection
Template.MethodSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleMethod', id);
	});
});

// Find Method for the template Studies
Template.MethodSingle.helpers({
	method: ()=> {
		var id = FlowRouter.getParam('id');
		return Methods.findOne({_id: id});
	}
});
