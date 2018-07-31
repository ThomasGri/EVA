

Template.CompareStudies.onCreated(function(){
	var self = this;
	self.autorun(function(){

	});
});

Template.CompareStudies.helpers({
	get_id:()=>{
		return FlowRouter.getParam('id');
	},

	align_tables(){

		setTimeout(function () {
			console.log($("[id^=questions_]"));

			$("[id^=questions_]").each(function(elem){
				console.log(elem.offsetTop);
			})
    }, 100);
		
	}
});
