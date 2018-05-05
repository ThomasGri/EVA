// Subscribe Template to Collection
Template.StudySingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleStudy', id);
	});
});

// Find Method for the template Studies
Template.StudySingle.helpers({
	study: ()=> {
		var id = FlowRouter.getParam('id');
		return Studies.findOne({_id: id});
	}
});
