// Subscribe Template to Collection
Template.NewTool.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('uploads');
    self.subscribe('ethicalProblems');
    self.subscribe('practicalProblems');
  });
});