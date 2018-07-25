var id = "";
var routeName = "";
var collection = "";

// Subscribe Template to Collection
Template.EditPartial.onCreated(function(){
	var self = this;
	self.autorun(function(){
		// Set ID and Name of the action
		id = FlowRouter.getParam('id');
		routeName = FlowRouter.current().route.name;
		
		self.subscribe("uploads");
		
		if(routeName == "edit-categoryType"){
			self.subscribe('singleCategoryType', id);
			collection = CategoryTypes;
		} else if (routeName == "edit-dataType"){
			self.subscribe('singleDataType', id);
			collection = DataTypes;
		} else if (routeName == "edit-ethicalProblem") {
			self.subscribe('singleEthicalProblem', id);
			collection = EthicalProblems;
		} else if (routeName == "edit-practicalProblem") {
			self.subscribe('singlePracticalProblem', id);
			collection = PracticalProblems;
		} else if (routeName == "edit-superType") {
			self.subscribe('singleSuperType', id);
			collection = SuperTypes;
		} else if (routeName == "edit-task") {
			self.subscribe('singleTask', id);
			self.subscribe('methods');
			collection = Tasks;
		} else if (routeName == "edit-tool") {
			self.subscribe('singleTool', id);
			collection = Tools;
		} else {
			console.log("Error no partial defined");
		}

	});
});

Template.EditPartial.helpers({
	getCollection(){		
		return collection;
	},
	getData() {
		return collection.findOne({_id: id});
	}
});

Template.EditPartial.events({
 'change #editPartialForm': function(e) {
    decodeSelect2("methods", "method", Methods);
  }
});

Template.EditPartial.onRendered(function(){

		decodeSelect2("methods", "method", Methods);

});