// Subscribe Template to Collection
Template.NewTool.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('uploads');
    self.subscribe('ethicalProblems');
    self.subscribe('practicalProblems');
  });
});

Template.NewTool.events({
  'click .cancel': function(event, template) {
    //event.preventDefault();  
    //FlowRouter.go('new-method');
    history.back()
  }
});

Template.NewTool.events({
  'click :submit': function(event, template) {
    //event.preventDefault();  
    //FlowRouter.go('new-method');
    history.back()
  }
});

Template.NewTool.events({
 'change #insertToolForm': function(e) {
    
  $("[name^='practical_problems']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-practicalProblem' target='_blank'>Request a new one</a>";
      }
    },
      escapeMarkup: function (markup) {
          return markup;
      }
  });
                        $("[name^='ethical_problems']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-ethicalProblem' target='_blank'>Request a new one</a>";
      }
    },
      escapeMarkup: function (markup) {
          return markup;
      }
  });
  
  }
});