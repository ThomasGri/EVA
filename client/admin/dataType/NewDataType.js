

Template.NewDataType.events({
  'click .cancel': function(event, template) {
    //event.preventDefault();  
    //FlowRouter.go('new-method');
    history.back()
  }
});

Template.NewDataType.events({
  'click :submit': function(event, template) {
    //event.preventDefault();  
    //FlowRouter.go('new-method');
    history.back()
  }
});