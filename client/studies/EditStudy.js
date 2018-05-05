// Subscribe Template to Collection
Template.EditStudy.onCreated(function(){
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
  });
});

// TODO fix event selector to always hit this.
Template.EditStudy.events({
 'change #methods-form': function(e) {
	 console.log("form changed");
      $("[name^='methods']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-method' target='_blank'>Create a new one</a>";
      }
    },
    escapeMarkup: function (markup) {
        return markup;
    },
    placeholder: "Select a Method",
    allowClear: true,
    templateSelection: function (data) {

      return Methods.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>";

      return namevalue;
      });
    }

  });
    }
});

Template.StudyMethods.onRendered(function(){

     // console.log(Wizard.getStep('information').data());

      $("[name^='methods']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-method' target='_blank'>Create a new one</a>";
      }
    },
    escapeMarkup: function (markup) {
        return markup;
    },
    placeholder: "Select a Method",
    allowClear: true,
    templateSelection: function (data) {

      return Methods.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>";

      return namevalue;
      });
    }

  });
    
});



Wizard.useRouter('kadira:flow-router');

Template.EditStudy.helpers({
  steps: function() {
    var id = FlowRouter.getParam('id');

var initialData = Studies.find({_id: id});
console.log(initialData[0]);

    return [{
      id: 'information',
      title: 'Information',
      template: 'StudyInformation',
      schema: GoalSchema,
      data: initialData.GoalSchema
    },{
      id: 'questions',
      title: 'Questions',
      template: 'StudyQuestions',
      schema: QuestionSchema,
    },{
      id: 'methods',
      title: 'Methods',
      template: 'StudyMethods',
      schema: MethodPlaningSchema,
    },{
      id: 'practical',
      title: 'Practical Problems',
      template: 'StudyPractical',
      schema: PracticalPlaningSchema,
    },{
      id: 'ethical',
      title: 'Ethical Problems',
      template: 'StudyEthical',
      schema: EthicalPlaningSchema,
      onSubmit: function(data, wizard) {
        var self = this;
        Studies.insert(_.extend(wizard.mergedData(), data), function(err, id) {
          if (err) {
            self.done();
          } else {
            wizard.clearData();
            FlowRouter.go('my-studies');
          }
        });
      }
    }]
  }
});


