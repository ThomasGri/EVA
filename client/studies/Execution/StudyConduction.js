var study_id = new ReactiveVar();

Template.StudyConduction.onCreated(function(){
  var self = this;
  self.autorun(function(){
  	self.subscribe('studies');
  	self.subscribe('taskarrayCollection');

  	study_id = FlowRouter.getParam('id');

  	Session.set("TaskIndex", 0);
  });
});




Template.StudyConduction.helpers({
	participants(){

		var taskarrays = TaskarrayCollection.findOne({"study_id": study_id, "index": 0});

		if(typeof taskarrays == "undefined"){
			return [];
		}

		count = taskarrays.participant_count;

		array = Array.from({length: count}, (v, k) => k+1); 
		return array;
	},
	participantName : function(participants){

		if(participants.length < 9){
			return true;
		} else {
			return false;
		}
		
	},
	showTab: function(id){
		return "openTab(event,"+id+")";
	},

	taskProgress: function(){
		return TaskarrayCollection.findOne({"study_id": study_id, "index": Session.get("TaskIndex")});
	},

	taskDetails: function(){
		var someValue = AutoForm.getFieldValue(this.name + ".task_id");

		return Tasks.findOne({_id: someValue});
	},

	file: ()=>{
		return getAttachedFile(Tasks, "file");
	},

	study_id(){
		return study_id;
	}

});

Template.StudyConduction.events({
  'change #show_completed': function(event){

  	// close tabs
  	tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }


    if(event.target.checked){
        $("[id^=participant_]").show();  
    } else { 
        // hide all participants.
        $("[id^=participant_]").hide();

  		TaskarrayCollection.find({"study_id": study_id}).fetch();

  		uncompleted_tasks = [];

		taskarrays.forEach(function(element, index){

			element.tasks.forEach(function(element2, index2){
				if(element2.status == 0){
					uncompleted_tasks.push(element2);
				}
				
			});
		});

		uncompleted_tasks.forEach(function(element, index){
			console.log(element);

			$("#participant_" + element.participant).show();
		});
    }
  }
});

Template.StudyConduction.onRendered(function(){
    // hide all participants.
    $("[id^=participant_]").hide();

	taskarrays = TaskarrayCollection.find({"study_id": study_id}).fetch();

	uncompleted_tasks = [];

	taskarrays.forEach(function(element, index){

		element.tasks.forEach(function(element2, index2){
			if(element2.status == 0){
				uncompleted_tasks.push(element2);
			}
			
		});
	});

	// show uncompleted participants.
	uncompleted_tasks.forEach(function(element, index){
		console.log(element);

		$("#participant_" + element.participant).show();
	});
});