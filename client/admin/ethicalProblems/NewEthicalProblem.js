

Template.NewEthicalProblem.events({
  'click .cancel': function(event, template) {
    //event.preventDefault();  
    //FlowRouter.go('new-method');
    history.back()
  }
});

Template.NewEthicalProblem.events({
  'click :submit': function(event, template) {
    //event.preventDefault();  
    //FlowRouter.go('new-method');
    history.back()
  }
});