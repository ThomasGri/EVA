

Template.NewPracticalProblem.events({
  'click .cancel': function(event, template) {
    //event.preventDefault();  
    //FlowRouter.go('new-method');
    history.back()
  }
});

Template.NewPracticalProblem.events({
  'click :submit': function(event, template) {
    //event.preventDefault();  
    //FlowRouter.go('new-method');
    history.back()
  }
});