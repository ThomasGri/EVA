var updateId = new ReactiveVar();

// Subscribe Template to Collection
Template.NewMethod.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('categoryTypes');
    self.subscribe('dataTypes');
    self.subscribe('ethicalProblems');
    self.subscribe('interpretations');
    self.subscribe('practicalProblems');
    self.subscribe('presentations');
    self.subscribe('superTypes');
    self.subscribe('tools');
    self.subscribe('uploads');
    self.subscribe('tasks');
    self.subscribe('methods');

    routeName = FlowRouter.current().route.name;

    if(routeName == "edit-method"){
      updateId = FlowRouter.getParam('id');

      informationData = Methods.findOne({_id: updateId}, {fields: {"name":1, "super_type":1, "category_type":1, "description": 1, "gathered_data_type":1}});
      problemsData = Methods.findOne({_id: updateId}, {fields: {"practical_problems":1, "ethical_problems":1}});
      toolsData = Methods.findOne({_id: updateId}, {fields: {"planing_tools":1, "conduction_tools":1, "analysis_tools":1, "presentation_tools":1}}); 
      tasksData = Methods.findOne({_id: updateId}, {fields: {"method_tasks":1}});
      additionalData = Methods.findOne({_id: updateId}, {fields: {"interpretation_advice":1, "presentation_options":1, "url":1, "file":1}});
    } else {

      updateId = "";
      informationData = null;
      problemsData = null;
      toolsData = null;
      tasksData = null;
      additionalData = null;
    }
  });
});

Template.MethodInformation.onRendered(function(){
  decodeSelect2("super_type", "superType", SuperTypes);
  decodeSelect2("category_type", "categoryType", CategoryTypes);
  decodeSelect2("gathered_data_type", "dataType", DataTypes);
});

Template.MethodProblems.onRendered(function(){
  decodeSelect2("practical_problems", "practicalProblem", PracticalProblems);
  decodeSelect2("ethical_problems", "ethicalProblem", EthicalProblems);
});

Template.MethodTools.onRendered(function(){
  decodeSelect2("planing_tools", "tool", Tools);
  decodeSelect2("conduction_tools", "tool", Tools);
  decodeSelect2("analysis_tools", "tool", Tools);
  decodeSelect2("presentation_tools", "tool", Tools);  
});

Template.MethodTasks.onRendered(function(){
  decodeSelect2("method_tasks", "task", Tasks);
});

Template.NewMethod.events({
   'change #information-form': function(e) {
      decodeSelect2("super_type", "superType", SuperTypes);
      decodeSelect2("category_type", "categoryType", CategoryTypes);
      decodeSelect2("gathered_data_type", "dataType", DataTypes);
  },

  'change #problems-form': function(e) {
    decodeSelect2("practical_problems", "practicalProblem", PracticalProblems);
    decodeSelect2("ethical_problems", "ethicalProblem", EthicalProblems);
  },
  'change #tools-form': function(e) {
    decodeSelect2("planing_tools", "tool", Tools);
    decodeSelect2("conduction_tools", "tool", Tools);
    decodeSelect2("analysis_tools", "tool", Tools);
    decodeSelect2("presentation_tools", "tool", Tools);       
    },

  'change #tasks-form': function(e) {
    decodeSelect2("method_tasks", "task", Tasks);
  }
});

Wizard.useRouter('kadira:flow-router');

Template.NewMethod.helpers({
  // Helpers to determine Wizard Attributes.
  getId(){
    if(routeName == "edit-method"){
      return "editMethodWizard";
    } else {
      return "newMethodWizard";
    }
  },

  getRoute() {
    return routeName;
  },

  steps: function() {
    return [{
      id: 'information',
      title: 'Information',
      template: 'MethodInformation',
      schema: MethodInformationSchema,
      data: informationData,
    },{
      id: 'problems',
      title: 'Problems',
      template: 'MethodProblems',
      schema: MethodProblemsSchema,
      data : problemsData,
    },{
      id: 'tools',
      title: 'Tools',
      template: 'MethodTools',
      schema: MethodToolSchema,
      data: toolsData,
    },{
      id: 'tasks',
      title: 'Tasks',
      template: 'MethodTasks',
      schema: MethodTasksSchema,
      data: tasksData,
    },{
      id: 'additional',
      title: 'Additional Information',
      template: 'MethodAdditional',
      schema: MethodAdditionalSchema,
      data: additionalData,

      onSubmit: function(data, wizard) {
        var self = this;
        var extend = _.extend(wizard.mergedData(), data);

        if(routeName == "new-method"){
        Methods.insert(extend, function(err, id) {
          if (err) {
            console.log(err);
            self.done();
          } else {
            tasksToInsert = (extend).method_tasks;

            if(tasksToInsert !== undefined){
              for(i=0; i < tasksToInsert.length; i++){

                Tasks.update({_id: tasksToInsert[i]}, {$push : {methods: id}});
              }
            }

            wizard.clearData();
            FlowRouter.go('method-collection');
          }
        });
      } else {
          Methods.update({"_id":updateId},{$set:extend},function(error, result){
            if(error){
              console.log(error);
              self.done();
            }else{

            tasksToInsert = (extend).method_tasks;

            if(tasksToInsert !== undefined){
              for(i=0; i < tasksToInsert.length; i++){

                Tasks.update({_id: tasksToInsert[i]}, {$push : {methods: updateId}});
              }
            }

              wizard.clearData();
              FlowRouter.go('method-collection');
            }
          });
      }
      }
    }]
  }
});