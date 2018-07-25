var id = "";

// Subscribe Template to Collection
Template.MethodSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		id = FlowRouter.getParam('id');
		self.subscribe('methods');
		self.subscribe('tasks');
		self.subscribe('tools');
		self.subscribe('ethicalProblems');
		self.subscribe('practicalProblems');
		self.subscribe('dataTypes');
		self.subscribe('categoryTypes');
		self.subscribe('superTypes');
		self.subscribe('uploads');
	});
});

// Find Method for the template Studies
Template.MethodSingle.helpers({
	element: ()=> {
		return Methods.findOne({_id: id});
	},
	superType:()=>{
		return getSubdocument(Methods, "super_type", SuperTypes);
	},
	categoryTypes:()=>{
		return getSubdocument(Methods, "category_type", CategoryTypes);
	},
	dataType:()=>{
		return getSubdocument(Methods, "gathered_data_type", DataTypes);
	},
	tasks: ()=>{
		return _.sortBy(getSubdocument(Methods, "method_tasks", Tasks), 'phaseint');
	},
	tools_planning: ()=>{
		return getSubdocument(Methods, "planing_tools", Tools);
	},
	tools_conduction: ()=>{
		return getSubdocument(Methods, "conduction_tools", Tools);
	},
	tools_analysis:()=>{
		return getSubdocument(Methods, "analysis_tools", Tools);
	},
	tools_presentation:()=>{
		return getSubdocument(Methods, "presentation_tools", Tools);
	},
	ethicalProblems:()=>{
		return getSubdocument(Methods, "ethical_problems", EthicalProblems);
	},
	practicalProblems:()=>{
		return getSubdocument(Methods, "practical_problems", PracticalProblems);
	},
	file: ()=>{
		return getAttachedFile(Methods, "file");
	},
	
});
