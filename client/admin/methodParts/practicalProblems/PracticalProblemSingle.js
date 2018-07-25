var id = "";

// Subscribe Template to Collection
Template.PracticalProblemSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		id = FlowRouter.getParam('id');
		self.subscribe('practicalProblems');
		self.subscribe('uploads');
	});
});

// Find Method for the template Studies
Template.PracticalProblemSingle.helpers({
	element: ()=> {
		//var id = FlowRouter.getParam('id');
		return PracticalProblems.findOne({_id: id});
	},

	file: ()=>{

		if(id == ""){
			return [];
		} else {
			var file_id = PracticalProblems.findOne({_id: id}, {fields: {"file":1}});

			if(typeof file_id == "undefined"){
				return [];
			}

			return Uploads.findOne({_id: file_id.file});
		}

	}
});