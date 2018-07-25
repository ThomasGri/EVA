// Subscribe Template to Collection
Template.NewTask.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('uploads');
    self.subscribe('ethicalProblems');
    self.subscribe('practicalProblems');
    self.subscribe('methods');
    self.subscribe('tasks');
    self.subscribe('methods');
  });
});

AutoForm.hooks({
  insertTaskForm: {
    onSuccess: function (formType, result) {

      taskId = result;
      methodsToInsert = Tasks.find({_id: taskId}).fetch()[0].methods;

      if(methodsToInsert !== undefined){
        for(i=0; i < methodsToInsert.length; i++){
          Methods.update({_id: methodsToInsert[i]}, {$push : {method_tasks: taskId}});
        }
      }

      history.back()
    }
  }
});

Template.NewTask.events({
 'change #insertTaskForm': function(e) {
    decodeSelect2("methods", "method", Methods);
  }
});