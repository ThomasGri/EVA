/**
*
* AutoForm Hooks
*
**/

// Redirect on Form submission.
AutoForm.addHooks(
  ['insertCategoryTypeForm', 'insertDataTypeForm', 'insertEthicalProblemForm', 'insertPracticalProblemForm', 
  'insertSuperTypeForm', 'insertTaskForm', 'insertToolForm', 'editPartialForm'],{
    onSuccess: function (formType, result) {
      history.back()
    }
  });

// Update Study status upon Task completeion.
AutoForm.addHooks(
  ['updateProgress'],{
    onSuccess: function (formType, result) {
      var id = FlowRouter.getParam('id');

      taskarrays = TaskarrayCollection.find({"study_id": id}).fetch();

      uncompleted_tasks = [];

      taskarrays.forEach(function(element, index){

        element.tasks.forEach(function(element2, index2){
          if(element2.status == 0){
            element2.participant = index+1;
            element2.tasknumber = index2+1;
            uncompleted_tasks.push(element2);
          }
          
        });
      });

      if(uncompleted_tasks.length > 0){
        Studies.update({"_id": id}, {$set: {'status': "Conduction"}});
      } else {
        Studies.update({"_id": id}, {$set: {'status': "Evaluation"}});
      }
    }
  });