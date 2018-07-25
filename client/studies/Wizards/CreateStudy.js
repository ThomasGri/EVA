Template.CreateStudy.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('studies');
  });
});

Template.CreateStudy.helpers({
  getStudies(){
    return Studies.find({});
  }
});

Template.CreateStudy.events({
	'click #new_study': function(event, template) {
    event.preventDefault();  
    FlowRouter.go('new-study');
  },

  'click #template':function(event, template){
    event.preventDefault();  
    FlowRouter.go('/copy-study/SZarMMuerLZGrJ94x');
  },

  'click #another_template':function(event, template){
    study_id = $("#study").val();
	  FlowRouter.go('/copy-study/' + study_id);
  },
})


Template.CreateStudy.onRendered(function(){
  $("#study").select2();
});