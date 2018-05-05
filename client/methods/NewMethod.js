// Subscribe Template to Collection
Template.NewMethod.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('categoryTypes');
    self.subscribe('dataTypes');
    self.subscribe('ethicalProblems');
    self.subscribe('interpretations');
    self.subscribe('practicalProblems');
    self.subscribe('presentations');
    self.subscribe('superTypes');
    self.subscribe('tools');
    self.subscribe('uploads');
  });
});

Template.NewMethod.events({
  'click .cancel': function(event, template) {
    //event.preventDefault();  
    //FlowRouter.go('new-method');
    history.back()
  }
});




Template.NewMethod.events({
 'change #insertMethodForm': function(e) {
      $("[name^='super_type']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-superType' target='_blank'>Request a new one</a>";
      }
    },
      escapeMarkup: function (markup) {
          return markup;
      },

    templateSelection: function (data) {

      return SuperTypes.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>";

      return namevalue;
      });
    }
  });
   $("[name^='category_type']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-categoryType' target='_blank'>Request a new one</a>";
      }
    },
      escapeMarkup: function (markup) {
          return markup;
      },

    templateSelection: function (data) {

      return CategoryTypes.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>";

      return namevalue;
      });
    }
  });
  $("[name^='practical_problems']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-practicalProblem' target='_blank'>Request a new one</a>";
      }
    },
      escapeMarkup: function (markup) {
          return markup;
      },

    templateSelection: function (data) {

      return PracticalProblems.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>";

      return namevalue;
      });
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
      },

    templateSelection: function (data) {

      return EthicalProblems.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>";

      return namevalue;
      });
    }
  });
    $("[name^='gathered_data_type']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-dataType' target='_blank'>Request a new one</a>";
      }
    },
      escapeMarkup: function (markup) {
          return markup;
      },

    templateSelection: function (data) {

      return DataTypes.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>";

      return namevalue;
      });
    }
  });
                  $("[name^='planing_tools']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-tool' target='_blank'>Request a new one</a>";
      }
    },
      escapeMarkup: function (markup) {
          return markup;
      },

    templateSelection: function (data) {

      return Tools.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>";

      return namevalue;
      });
    }
  });
                    $("[name^='conduction_tools']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-tool' target='_blank'>Request a new one</a>";
      }
    },
      escapeMarkup: function (markup) {
          return markup;
      },

    templateSelection: function (data) {

      return Tools.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>";

      return namevalue;
      });
    }
  });
                    $("[name^='analysis_tools']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-tool' target='_blank'>Request a new one</a>";
      }
    },
      escapeMarkup: function (markup) {
          return markup;
      },
    templateSelection: function (data) {

      return Tools.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>";

      return namevalue;
      });
    }
  });
                    $("[name^='presentation_tools']").select2({
    language: {
      noResults: function (params) {
        return "No matching results. Check your spelling or " + "<a href='/new-tool' target='_blank'>Request a new one</a>";
      }
    },
      escapeMarkup: function (markup) {
          return markup;
      },

    templateSelection: function (data) {

      return Tools.find({_id: data.id}, {fields: {'name':1}}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>";

      return namevalue;
      });
    }
  });
  }
});

Wizard.useRouter('kadira:flow-router');

Template.NewMethod.helpers({
  steps: function() {
    return [{
      id: 'information',
      title: 'Information',
      template: 'MethodInformation',
      schema: MethodInformationSchema,
    },{
      id: 'problems',
      title: 'Problems',
      template: 'MethodProblems',
      schema: MethodProblemsSchema,
    },{
      id: 'tools',
      title: 'Tools',
      template: 'MethodTools',
      schema: MethodToolSchema,
    },{
      id: 'additional',
      title: 'Additional Information',
      template: 'MethodAdditional',
      schema: MethodAdditionalSchema,

      onSubmit: function(data, wizard) {
        var self = this;
        Methods.insert(_.extend(wizard.mergedData(), data), function(err, id) {
          if (err) {
            self.done();
          } else {
            wizard.clearData();
            FlowRouter.go('method-collection');
          }
        });
      }
    }]
  }
});
