var id = "";

// Subscribe Template to Collection
Template.EthicalProblemSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		id = FlowRouter.getParam('id');
		self.subscribe('ethicalProblems');
		self.subscribe('uploads');
	});
});

// Find Method for the template Studies
Template.EthicalProblemSingle.helpers({
	element: ()=> {
		//var id = FlowRouter.getParam('id');
		return EthicalProblems.findOne({_id: id});
	},

	file: ()=>{

		if(id == ""){
			return [];
		} else {
			var file_id = EthicalProblems.findOne({_id: id}, {fields: {"file":1}});

			if(typeof file_id == "undefined"){
				return [];
			}

			return Uploads.findOne({_id: file_id.file});
		}

	}
});
