var id = "";

// Subscribe Template to Collection
Template.ToolSingle.onCreated(function(){
	var self = this;
	self.autorun(function(){
		id = FlowRouter.getParam('id');
		self.subscribe('tools');
		self.subscribe('uploads');
	});
});

// Find Method for the template Studies
Template.ToolSingle.helpers({
	element: ()=> {
		//var id = FlowRouter.getParam('id');
		return Tools.findOne({_id: id});
	},

	file: ()=>{

		if(id == ""){
			return [];
		} else {
			var file_id = Tools.findOne({_id: id}, {fields: {"file":1}});

			if(typeof file_id == "undefined"){
				return [];
			}

			return Uploads.findOne({_id: file_id.file});
		}

	}
});