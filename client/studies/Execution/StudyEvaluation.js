
Template.StudyEvaluation.onCreated(function(){
	var self = this;

	this.id = new ReactiveVar(FlowRouter.getParam('id')); 

	self.autorun(function(){
		// Basic Study Data
		self.subscribe('studies');
		self.subscribe('taskarrayCollection');
		self.subscribe('counterBalancing');

		// Task evaluation advice + levels.
		self.subscribe('tasks');
		self.subscribe('methods');
		self.subscribe('superTypes');
		self.subscribe('categoryTypes');
		self.subscribe('dataTypes');
	});
});


Template.StudyEvaluation.events({
	// Expand & Collapse the additional information
	'click .fa-caret-down': function(event){
		elem = $(event.target).parent().next('div');
		elem.attr('hidden', !elem.attr('hidden'));
	}
})

Template.StudyEvaluation.helpers({

	reset_participant: function(participant){

		x = participant;
		console.log(participant);
		return "console.log(this.getAttribute('val'))";
	},

	remove_participant: function(participant){
		console.log(participant);
		return "console.log(participant)";
	},


	pretest_tasks(){
		return getSubdocument(Studies, "pretest_tasks", Tasks, Template.instance().id.get());
	},

	test_tasks(){
		return getSubdocument(Studies, "test_tasks", Tasks, Template.instance().id.get());
	},

	posttest_tasks(){
		return getSubdocument(Studies, "posttest_tasks", Tasks, Template.instance().id.get());
	},

	task_advice(){

		// Step 1: get all the tasks -> Advice on Task Level + General Information
		pretest = getSubdocument(Studies, "pretest_tasks", Tasks, Template.instance().id.get());

		test = getSubdocument(Studies, "test_tasks", Tasks, Template.instance().id.get());

		posttest = getSubdocument(Studies, "posttest_tasks", Tasks, Template.instance().id.get());

		// Step 6: Join Tasks of Phases OR separate the phases by different helpers.
		pretest = pretest.concat(test);
		pretest = pretest.concat(posttest);

		// Step 2: get all the Methods for each Task.
		pretest.forEach(function(task, index){
			task.methods = getSubdocument(Tasks, "methods", Methods, task._id);

			// Step 5: Get conduction Comments + Resultfiles and add them.
			taskresults = TaskarrayCollection.find({"study_id": Template.instance().id.get()}).fetch();

			// New fields to use in final object.
			task.comments = [];
			task.resultfiles = [];

			taskresults.forEach(function(result){

				result.tasks.forEach(function(singleresult){

					if(task._id == singleresult.task_id){ // -> taskresult belongs to task currently inside loop.

						comment = singleresult["comment"];
						resultfile = singleresult["resultfile"];

						participant = result.index+1; // off-by-one fix

						// Push the comments / files + participant number to the tasks metadata. (If they exist)
						if(!(comment === "")){
							task.comments.push({comment, participant});
						}
					
						if(!(typeof resultfile === "undefined")){
							task.resultfiles.push({resultfile, participant});
						}
					}
				})
			});

			// Step 3: get cascading advice for methods.
			task.methods.forEach(function(method){
				method.super_type = getSubdocument(Methods, "super_type", SuperTypes, method._id);
				method.category_type = getSubdocument(Methods, "category_type", CategoryTypes, method._id);
				method.gathered_data_type = getSubdocument(Methods, "gathered_data_type", DataTypes, method._id);
			});
		});

		console.log(pretest);
		return pretest;
	},

	get_file(file_id){
		return Uploads.findOne({_id: file_id});
	},















	open_tasks(){
		taskarrays = TaskarrayCollection.find({"study_id": Template.instance().id.get()}).fetch();

		uncompleted_tasks = [];

		taskarrays.forEach(function(tasklist, index){

			tasklist.tasks.forEach(function(task, index2){
				if(task.status == 0){
					task.participant = index+1;
					task.tasknumber = index2+1;
					uncompleted_tasks.push(task);
				}
			});
		});

		return uncompleted_tasks;
	},

	failed_tasks(){
		taskarrays = TaskarrayCollection.find({"study_id": Template.instance().id.get()}).fetch();

		// information about the number of participants in every group + their number (indexes)
		taskgroups = CounterBalancing.findOne({"study_id": Template.instance().id.get()});

		affecting_tasks = [];
		other_tasks = [];

		console.log("here it starts");
		taskarrays.forEach(function(tasklist, index){
			tasklist.tasks.forEach(function(task, index2){
				if(task.status == 2){ // -> Task failed.
					task.participant = index+1;	// solve off-by-one
					task.tasknumber = index2+1;

					if(task.counter_balancing_group === 0){ // -> Task was not counterbalanced -> No influence on Counterbalancing.
						other_tasks.push(task);
					} else {

						// do something with the taskgroups.
						taskgroups.groups.forEach(function(group, index3){

							if(!(typeof group.participants === "undefined")){
								check_contain = group.indexes.indexOf(task.participant-1);

								// task is part of this group.
								if (check_contain > -1){
									for(i = 0; i < taskgroups.groups.length; i ++){
										if(taskgroups.groups[i].participants !== (group.participants-1) && i !== index3){ // check for partial groups that are bigger

											// only add task if it is not inside array already.
											if((affecting_tasks.find( affecting_tasks => affecting_tasks['tasknumber'] === task.tasknumber)
												&& affecting_tasks.find( affecting_tasks => affecting_tasks['participant'] === task.participant )
												)) {
												
											} else {
												affecting_tasks.push(task);
											}
										}
									}

									// if the task is not inside affecting_tasks now it belongs to non-influencing tasks
									if((affecting_tasks.find( affecting_tasks => affecting_tasks['tasknumber'] === task.tasknumber)
										&& affecting_tasks.find( affecting_tasks => affecting_tasks['participant'] === task.participant )
										)) {

									} else {
										other_tasks.push(task);
									}
								}
							}
						});						
					}
				}			
			});
		});

		if(affecting_tasks.length == 0 && other_tasks.length == 0){
			return [];
		} else {
			failed_tasks = [affecting_tasks, other_tasks];
			return failed_tasks;
		}


	},

	participants(){

		var taskarrays = TaskarrayCollection.findOne({"study_id": Template.instance().id.get(), "index": 0});

		if(typeof taskarrays == "undefined"){
			return [];
		}

		count = taskarrays.participant_count;

		array = Array.from({length: count}, (v, k) => k+1); 
		return array;
	},
});