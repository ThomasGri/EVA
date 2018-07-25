var study_id = "";
var study_status = "";

// Subscribe Template to Collection
Template.StudyAllWizards.onCreated(function(){
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

    self.subscribe('studies');

    updateId = FlowRouter.getParam('id');

    

    });
});

Template.StudyAllWizards.onRendered(function(){

    // toggle Accordion entry according to the status of the study.
    study_status = Studies.findOne({_id: updateId}, {fields:{ "status":1}});

    if(typeof study_status === "undefined"){
        $("#collapseOne").addClass("show");
    } else {
        if(study_status.status == "In Planning"){
            $("#collapseOne").addClass("show");
        } else if (study_status.status == "Conduction"){
            $("#collapseTwo").addClass("show");
        } else if (study_status.status == "Evaluation"){
            $("#collapseThree").addClass("show");
        } else {
            $("#collapseOne").addClass("show");
        }
    }


});