/** Autoform on success hook for non-wizard forms **/
AutoForm.addHooks(
  ['insertCategoryTypeForm', 'insertDataTypeForm', 'insertEthicalProblemForm', 'insertPracticalProblemForm', 
  'insertSuperTypeForm', 'insertTaskForm', 'insertToolForm', 'editPartialForm'],{
    onSuccess: function (formType, result) {
      history.back()
    }
  });

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
        console.log("still tasks open");
        Studies.update({"_id": id}, {$set: {'status': "Conduction"}});
      } else {
        console.log("no tasks open");
        Studies.update({"_id": id}, {$set: {'status': "Evaluation"}});
      }

      
    }
  })

// "Global" handler clicking on cancel of autoforms.
Template.MainLayout.events({
  'click .cancel': function(event, template) {
    history.back()
  }
});

// global Helper to convert external links.
Template.registerHelper("addHttp", function (url) {
  if (!/^(f|ht)tps?:\/\//i.test (url)) {
    url = "https://" + url;
  }
  return url;
});


/**
*
*   Global Functions for Javascript
*
**/


deleteConfirmation = function(collection, elementId){
  swal({
    title: 'Are you sure?',
    text: 'You will not be able to recover this element!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
  }).then(function() {
      collection.remove({_id: elementId});
    swal(
      'Deleted!',
      'Your imaginary file has been deleted.',
      'success'
    );
  }, function(dismiss) {
      // No action needed.
  });
}


// client side wrapper function for sendMail
sendNotification = function(to, subject, message){

  console.log("Notification sent!");

  Meteor.call(
    'sendEmail',
    to,
    'evaluation.study.tool@gmail.com',
    subject,
    message
  );

}


// Get Data of Subdocument (pseudo join)
getSubdocument = function(collection, field, subcollection, id){
  // Get ID. if required add the id as function arg.
  if (typeof id === 'undefined') { id = FlowRouter.getParam('id'); }

  // find parent element
  parent = collection.findOne({_id: id});

  // stop if there is not parent element (implies no subdocument)
  if (typeof parent === "undefined"){
    return [];
  }

  // specify which field(subdocument) is searched for
  toFind = parent[field];

  // nothing to find => return empty.
  if(typeof toFind === "undefined"){
    return [];
  }

    // convert single ID to Array for the Query.
    if(!(toFind instanceof Array)){
      toFind = [toFind];
    }

  // return subdocument result
  return subcollection.find({_id: {$in: toFind}}).fetch();
}

// get attached file of a document
getAttachedFile = function(collection, fieldname, id){

  // Get ID. If required add as function arg.
  if (typeof id === 'undefined') { id = FlowRouter.getParam('id'); }

  // get the parent document
  var parent = collection.findOne({_id: id});

  // stop if there is no parent document
  if(typeof parent == "undefined"){
    return [];
  }

  // extract the id of the file
  fileid = parent[fieldname];

  // return the file
  return Uploads.findOne({_id: fileid});
}

// get & format the Select2 Boxes of a specific Input
decodeSelect2 = function(selectBoxName, noResultPath, collection){

  $("select[name^='" + selectBoxName + "']").select2({

    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-" + noResultPath + "' target='_blank'>Request a new one</a>";
      }
    },

    templateSelection: function (data) {

      return collection.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

        namevalue= "<strong>" + c.name + "</strong><br>";
        
        return namevalue;
      });
    },
    escapeMarkup: function (markup) {
      return markup;
    }
  });

}