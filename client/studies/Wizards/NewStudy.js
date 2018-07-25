var updateId = new ReactiveVar();

var count = new ReactiveVar();


// Subscribe Template to Collection
Template.NewStudy.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('methods');
    self.subscribe('categoryTypes');
    self.subscribe('dataTypes');
    self.subscribe('ethicalProblems');
    self.subscribe('interpretations');
    self.subscribe('practicalProblems');
    self.subscribe('presentations');
    self.subscribe('superTypes');
    self.subscribe('tools');
    self.subscribe('uploads');
    self.subscribe('allUsers');
    self.subscribe('tasks');
    self.subscribe('studies');
    self.subscribe('studyConduction');
    self.subscribe('temporaryCollection')
    self.subscribe('counterBalancing');

    count = 0;

    routeName = FlowRouter.current().route.name;

    if(routeName == "edit-study"){
      updateId = FlowRouter.getParam('id');

      informationData = Studies.findOne({_id: updateId}, {fields: {
        "name":1, "description":1, "what":1, "why":1, "who":1, "public":1, "collaborators":1, "createdAt":1, "status":1, "goal_url":1, "goal_file":1}});

      questionsData = Studies.findOne({_id: updateId}, {fields: {"main_question":1, "questions":1, "question_url":1, "question_file":1}});
      methodsData = Studies.findOne({_id: updateId}, {fields: {"methods":1, "method_url":1, "method_file":1}});
      
      tasksData = Studies.findOne({_id: updateId}, {fields: {"pretest_tasks":1, "test_tasks":1, "posttest_tasks":1}});

      practicalData = Studies.findOne({_id: updateId}, {fields: {"participants":1, "location":1, "participant_req":1, "practical_url":1, "practical_file":1}});
      ethicalData = Studies.findOne({_id: updateId}, {fields: {"information":1, "ethical_url":1, "ethical_file":1}});

      counterbalancingData = StudyConduction.findOne({study_id: updateId});

    } else if (routeName == "copy-study"){
      updateId = FlowRouter.getParam('id');
      
      informationData = Studies.findOne({_id: updateId}, {fields: {
        "name":1, "description":1, "what":1, "why":1,  "public":1,  "createdAt":1, "goal_url":1, "goal_file":1}});

      questionsData = Studies.findOne({_id: updateId}, {fields: {"main_question":1, "questions":1, "question_url":1, "question_file":1}});
      methodsData = Studies.findOne({_id: updateId}, {fields: {"methods":1, "method_url":1, "method_file":1}});
      
      tasksData = Studies.findOne({_id: updateId}, {fields: {"pretest_tasks":1, "test_tasks":1, "posttest_tasks":1}});

      practicalData = Studies.findOne({_id: updateId}, {fields: {"participants":1, "location":1, "participant_req":1, "practical_url":1, "practical_file":1}});
      ethicalData = Studies.findOne({_id: updateId}, {fields: {"information":1, "ethical_url":1, "ethical_file":1}});

      counterbalancingData = StudyConduction.findOne({study_id: updateId});
    } else { // routeName = new-study

      updateId = "";
      
      informationData = null;
      questionsData = null;
      methodsData = null;
      tasksData = null;
      practicalData = null;
      ethicalData = null;

      counterbalancingData = null;
    }
  });
});

Template.NewStudy.events({
  'click .cancel': function(event, template) {
    FlowRouter.go('my-studies');
  }
});

Wizard.useRouter('kadira:flow-router');

Template.StudyPractical.helpers({
  impliedProblems(){
    method_ids = this.wizard.mergedData().methods;

    if(typeof method_ids === "undefined"){
      return [];
    }

    methods = Methods.find({_id: {$in: method_ids}}).fetch();

    problem_ids = [];

    // switching from [[]] to [] for next query.
    temp = methods.map(function(a) {return a.practical_problems;});

    temp = temp.filter(function(n){ return n != undefined }); 

    temp.forEach(function(element) {
      element.forEach(function(x) {
        problem_ids.push(x);
      });
    });

    problems = PracticalProblems.find({_id: {$in: problem_ids}}).fetch();

    return problems;
  },

  get_file: function(id){
    return getAttachedFile(PracticalProblems, "file", id);
  },
});

Template.StudyEthical.helpers({
  impliedProblems(){
    method_ids = this.wizard.mergedData().methods;

    if(typeof method_ids === "undefined"){
      return [];
    }

    methods = Methods.find({_id: {$in: method_ids}}).fetch();

    problem_ids = [];

    // switching from [[]] to [] for next query.
    temp = methods.map(function(a) {return a.ethical_problems;});
    temp = temp.filter(function(n){ return n != undefined });

    temp.forEach(function(element) {
      element.forEach(function(x) {
        problem_ids.push(x);
      });
    });

    problems = EthicalProblems.find({_id: {$in: problem_ids}}).fetch();

    return problems;
  },

  get_file: function(id){
    return getAttachedFile(EthicalProblems, "file", id);
  },
});

Template.NewStudy.helpers({

  warningmessage(){
    if(!(informationData === null)){
      if(!(informationData.status == "In Planning")){
        return "Warning: If you change the planning of the study the data for conduction that is already entered will be lost!";
      }
    }
    return "";
  },

  // Helpers to determine Wizard Attributes.
  getId(){
    if(routeName == "edit-study"){
      return "editStudyWizard";
    } else {
      return "newStudyWizard";
    }
  },

  getRoute() {
    return routeName;
  },

  steps: function() {
    return [{
      id: 'information',
      title: 'Information',
      template: 'StudyInformation',
      schema: GoalSchema,
      data:informationData,
    },{
      id: 'questions',
      title: 'Questions',
      template: 'StudyQuestions',
      schema: QuestionSchema,
      data: questionsData,
    },{
      id: 'methods',
      title: 'Methods',
      template: 'StudyMethods',
      schema: MethodPlaningSchema,
      data: methodsData,
    },
    {
      id: 'practical',
      title: 'Practical Problems',
      template: 'StudyPractical',
      schema: PracticalPlaningSchema,
      data: practicalData,
    },
    {
      id: 'ethical',
      title: 'Ethical Problems',
      template: 'StudyEthical',
      schema: EthicalPlaningSchema,
      data: ethicalData,
    },
    {
      id: 'tasks',
      title: 'Tasks',
      template: 'StudyTasks',
      schema: StudyTaskSchema,
      data: tasksData,
      onSubmit: function(data, wizard){

        combined = [];

        pretest = data.pretest_tasks;
        test = data.test_tasks;
        posttest = data.posttest_tasks;

        if(typeof participantcount === "undefined"){
          participantcount = 0;
        }

        if(!(typeof pretest === "undefined")){
          if(!(pretest instanceof Array)){
            pretest = [pretest];
          }
          combined = combined.concat(pretest);
        }

        if(!(typeof test === "undefined")){
          if(!(test instanceof Array)){
            test = [test];
          }
          combined = combined.concat(test);
        }

        if(!(typeof posttest === "undefined")){
          if(!(posttest instanceof Array)){
            posttest = [posttest];
          }
          combined = combined.concat(posttest);
        }

        testarray = [];

        combined.forEach(function(element) {

          value = element;

          element = {'task_id': value};
          element.counter_balancing_group = 0;

          tmp = Tasks.findOne({_id: value});
          element.name = tmp.name;
          element.phase = tmp.phase;

          testarray.push(element);
        });

        participantcount = wizard.mergedData().participants;

        TemporaryCollection.insert({tasks: testarray, participant_count: participantcount, study_id: updateId},function(error, id){
          if(error){
            console.log(error);
          } else {
            temporaryId = id;
            wizard.next(data);
          }
        });
      }
    },
    { 
      id: 'counterbalancing',
      title: 'Counterbalancing',
      template: 'StudyCounterbalancing',
      schema: TemporarySchema,
      onSubmit: function(data, wizard) {
        var self = this;
        var extend = wizard.mergedData();

        extend.counter_balancing = data.counter_balancing_type;

        if(routeName == "new-study" || routeName == "copy-study"){
          // inset new study document
          Studies.insert(extend, function(err, id) {
            if (err) {
              console.log(err);
              self.done();

            } else {

            collaborators = extend.collaborators;

            if(!(typeof collaborators === "undefined")){
              collaborators.forEach(function(element){
                sendNotification(
                  Meteor.users.findOne({_id: element}).emails[0].address, 
                "Added to new Study", 
                "Dear User,<br> you have been added as a researcher to the following study: <a href='http://localhost:3000/view-study/" 
                + id + "'>Check out the study!</a>" );
              });
            }

            // update TemporaryCollection with the corresponding study_id.
            data.study_id = id;
            TemporaryCollection.update({"_id":temporaryId},{$set:data}, function(err, id) {
              if (err) {
                console.log(err);
                self.done();
              } else {

              // Get Temporary Data for Study.
              data_for_work = TemporaryCollection.findOne({"_id": temporaryId});
             
              study_id = data_for_work.study_id;
              participant_count = data_for_work.participant_count;
              counterbalancing_result = counterBalance(data_for_work.tasks, participant_count, data_for_work.counter_balancing_type);

              rebalanced_tasks = counterbalancing_result[1];

              counterbalancing_to_insert = [];

              counterbalancing_to_insert["groups"] = counterbalancing_result[0];
              counterbalancing_to_insert["study_id"] = study_id;

              CounterBalancing.insert(counterbalancing_to_insert);

              rebalanced_tasks.forEach(function(element, index){
                TaskarrayCollection.insert({"study_id": study_id, "index": index, "participant_count": participantcount, "tasks": element});
              });

              TemporaryCollection.remove({_id: data_for_work._id});

              wizard.clearData();
              FlowRouter.go('my-studies');
            }
          });
          }
        });
        } else {

            swal({
              title: 'Are you sure?',
              text: 'Changing the planning Data will reset your inputs for Conduction!',
              type: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, update!',
              cancelButtonText: 'No, discard the change',
            }).then(function() {

          // Compare Collaborators previously to new collaborators to avoid sending emails to people who are already working on the study. 
          old_collaborators = Studies.findOne({_id: updateId}).collaborators;

          if(typeof old_collaborators === "undefined"){
            old_collaborators = [];
          }

            collaborators = extend.collaborators;

            if(!(typeof collaborators === "undefined")){
              collaborators.forEach(function(element){
                if(old_collaborators.indexOf(element) < 0){ // => Collaborator was already working on the study.
                  sendNotification(
                    Meteor.users.findOne({_id: element}).emails[0].address, 
                  "Added to new Study", 
                  "Dear User,<br> you have been added as a researcher to the following study: <a href='http://localhost:3000/view-study/" 
                  + updateId + "'>Check out the study!</a>" );
                } else {
                  console.log("dude is already working");
                }
              });
            }
                
          // update studies document -- replace inserts with updates.
          Studies.update({"_id":updateId},{$set:extend},function(error, id){
            if(error){
              console.log(error);
              self.done();
            }else{

              TemporaryCollection.update({"_id":temporaryId},{$set:data}, function(err, id) {
                if (err) {
                  console.log(err);
                  self.done();
                } else {
                // Get Temporary Data for Study.
                data_for_work = TemporaryCollection.findOne({study_id: updateId});

                study_id = data_for_work.study_id;
                participant_count = data_for_work.participant_count;
                counterbalancing_result = counterBalance(data_for_work.tasks, participant_count, data_for_work.counter_balancing_type);

                rebalanced_tasks = counterbalancing_result[1];

                counterbalancing_to_insert = [];

                counterbalancing_to_insert["groups"] = counterbalancing_result[0];
                counterbalancing_to_insert["study_id"] = study_id;


                // Delete old data from CounterBalancing 
                counterbalancing_old = CounterBalancing.findOne({"study_id": study_id});
                if(typeof counterbalancing_old === "undefined"){
                  // nothing to do
                } else {
                  console.log(counterbalancing_old);
                  CounterBalancing.remove({_id: counterbalancing_old._id});
                }

                // Delete old data from Taskarray Collection
                taskarrays_old = TaskarrayCollection.find({"study_id": study_id}).fetch();
                if(typeof taskarrays_old === "undefined"){
                  // nothing to do
                } else {
                  taskarrays_old.forEach(function(element, index){
                    TaskarrayCollection.remove({_id: element._id});
                  });
                }



                CounterBalancing.insert(counterbalancing_to_insert);

                rebalanced_tasks.forEach(function(element, index){
                  TaskarrayCollection.insert({"study_id": study_id, "index": index, "participant_count": participantcount, "tasks": element});          
                });

                TemporaryCollection.remove({_id: data_for_work._id});

                wizard.clearData();
                FlowRouter.go('my-studies');

              }
            });
            }
          });
              swal(
                'Updated!',
                'Your study planning has been updated.',
                'success'
              );
            }, function(dismiss) {
                // No action needed.
            });
        }
      }
    }]
  }
});

Template.NewStudy.events({
 'change #methods-form': function(e) {
  decodeSelect2("methods", "method", Methods);
},
'change #tasks-form': function(e) {
  decodeSelect2("pretest_tasks", "task", Tasks);
  decodeSelect2("test_tasks", "task", Tasks);
  decodeSelect2("posttest_tasks", "task", Tasks);
}
});

Template.StudyMethods.onRendered(function(){
  decodeSelect2("methods", "method", Methods); 
});

Template.StudyTasks.onRendered(function(){
  decodeSelect2("pretest_tasks", "task", Tasks);
  decodeSelect2("test_tasks", "task", Tasks);
  decodeSelect2("posttest_tasks", "task", Tasks);
});

Template.StudyTasks.helpers({
  setVar(){
    selectedMethods = this.wizard.mergedData().methods;
  }
});

Template.StudyCounterbalancing.onRendered(function(){
  // disable array + - buttons.
  $(".btn.btn-primary.autoform-remove-item").remove();
  $(".btn.btn-primary.autoform-add-item").remove();
});

Template.StudyCounterbalancing.helpers({
  temporaryData(){
    if(typeof temporaryId === "undefined"){
      return TemporaryCollection.findOne({study_id: updateId});
    } else {
      return TemporaryCollection.findOne({_id: temporaryId});
    }
  }
});