/**
*
*   Global Functions for Javascript
*
**/

// Warning Message upon delete of element.
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

// Client side wrapper function for sendMail
sendNotification = function(to, subject, message){
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
  // Get id if not given as arg.
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

  // convert single ID to Array (to use $in in query)
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

  console.log(fileid);
  
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

// Code inspired by: https://www.w3schools.com/howto/howto_js_tabs.asp
openTab = function (evt, id) {

    // Set index of the tab.
    Session.set("TaskIndex", id-1);

    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
}