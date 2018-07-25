

Template.CompareStudies.onCreated(function(){
	var self = this;
	self.autorun(function(){
		//id = FlowRouter.getParam('id');
	});
});

Template.CompareStudies.helpers({
	get_id:()=>{
		return FlowRouter.getParam('id');
	} 
});