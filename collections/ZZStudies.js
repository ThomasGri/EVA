import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Studies = new Mongo.Collection('Studies');


Studies.allow({
  insert: function(userId, doc){
    return !!userId;
  },
  update: function(userId, doc){
    return !!userId;
  },
  remove: function(userId, doc){
    return doc.author == userId;
  }

});


GoalSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    optional: true
  },

  description: {
    type: String,
    label: "Description",
    optional: true
  },
  what: {
    type: String,
    optional: true,
    label: "What?"
  },
  why: {
    type: String,
    optional: true,
    label: "Why?"
  },
  who: {
    type: String,
    optional: true,
    label: "Who?"
  },
   public: {
  type: Boolean,
  defaultValue: false,
  optional: true
 },
  collaborators: {
    type: Array,
    optional: true
  },
  'collaborators.$': {
     type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      placeholder: 'Comma spaced list of occupations',
      options: function () {

    return Meteor.users.find({}).map(function (c){

      namevalue = c.profile.lastName + ", " + c.profile.firstName;

      return {label: namevalue, value: c._id};
    });
}
    } 
  },
   goal_url: {
    label: "Url",
    type: String,
    optional: true
  },
  goal_file: {
    label: "File",
    type: String,
    optional: true, 
     autoform: {
      afFieldInput:{
      type: 'fileUpload',
        collection: 'Uploads',
        label: 'Choose file'
      }
     }
  },

  author: {
  type: String,
  label: "Author",
  autoValue: function(){
    if (this.isInsert) {
        return this.userId;
      }
  },
  autoform: {
   afFieldInput: {
    type: "hidden"
   },
   afFormGroup: {
         label: false
      }
  }
 },
 createdAt: {
  type: Date,
  label: "CreatedAt",
  autoValue: function() {
   return new Date();
  },
  autoform: {
   afFieldInput: {
    type: "hidden"
   },
   afFormGroup: {
         label: false
      }
  },
 },

 status: {
  type: String,
  label: "Status",
  autoValue: function(){
      if (this.isInsert) {
        return "In Planning";
      }
  },
  autoform: {
   afFieldInput: {
    type: "hidden"
   },
   afFormGroup: {
         label: false
      }
  }
 },

  counter_balancing: {
  type: Number,
  optional:true,
  label: "Coutnerbalancing Type",
  autoform: {
   afFieldInput: {
    type: "hidden"
   },
   afFormGroup: {
         label: false
      }
  }
 }
});

QuestionSchema = new SimpleSchema({
  main_question: {
    type: String,
    optional: true
  },
  questions: {
    type: Array,
    optional: true
  },
  'questions.$':{
    type: String
  },
   question_url: {
    label: "Url",
    type: String,
    optional: true
  },
  question_file: {
    type: String,
    label: "File",
    optional: true, 
     autoform: {
      afFieldInput:{
      type: 'fileUpload',
        collection: 'Uploads',
        label: 'Choose file'
      }
     }
  },
});

MethodPlaningSchema = new SimpleSchema({
  methods: {
    type: Array,
    optional: true
  },
  'methods.$':{
      type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      options: function () {

    return Methods.find({}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

      return {label: namevalue, value: c._id};;
    });
}
    }
 },
  method_url: {
    label: "Url",
    type: String,
    optional: true
  },
  method_file: {
    label:"File",
    type: String,
    optional: true, 
     autoform: {
      afFieldInput:{
      type: 'fileUpload',
        collection: 'Uploads',
        label: 'Choose file'
      }
     }
  },
});


StudyTaskSchema = new SimpleSchema({

    filter_tasks: {
      type: Boolean,
      defaultValue: true,
      optional: true
    },

    pretest_tasks: {
    type: Array,
    optional: true
  },
'pretest_tasks.$':{
    type: String,
    label: false,

    autoform:{
      type:"select2",
      options: function () {

        filter = AutoForm.getFieldValue('filter_tasks');

        if(filter == false){

          return Tasks.find({'phase': 'Pretest'}).map(function (c){

                namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

                return {label: namevalue, value: c._id};;
              });
        } else {


          methodTasks = Methods.find({_id: {$in: selectedMethods}}).fetch();

          task_ids = [];

          // switching from [[]] to [] for next query.
          temp = methodTasks.map(function(a) {return a.method_tasks;}); 
          temp.forEach(function(element) {
            element.forEach(function(x) {
                task_ids.push(x);
            });
          });

          task_ids = task_ids.concat(AutoForm.getFieldValue('pretest_tasks'));

          return Tasks.find({'phase': 'Pretest', '_id': {$in: task_ids}}).map(function (c){

            namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

            return {label: namevalue, value: c._id};
          });
        }

      }

    }
 },

    test_tasks: {
    type: Array,
    optional: true
  },
  'test_tasks.$':{
      type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      options: function () {

        filter = AutoForm.getFieldValue('filter_tasks');

        if(filter == false){
          return Tasks.find({'phase': 'Test'}).map(function (c){

                namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

                return {label: namevalue, value: c._id};;
              });
        } else {

          methodTasks = Methods.find({_id: {$in: selectedMethods}}).fetch();

          task_ids = [];

          // switching from [[]] to [] for next query.
          temp = methodTasks.map(function(a) {return a.method_tasks;}); 
          temp.forEach(function(element) {
            element.forEach(function(x) {
                task_ids.push(x);
            });
          });

          task_ids = task_ids.concat(AutoForm.getFieldValue('test_tasks'));

          return Tasks.find({'phase': 'Test', '_id': {$in: task_ids}}).map(function (c){

            namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

            return {label: namevalue, value: c._id};
          });
        }

      }
    }
 },


posttest_tasks: {
    type: Array,
    optional: true
  },
  'posttest_tasks.$':{
      type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      options: function () {

        filter = AutoForm.getFieldValue('filter_tasks');

        if(filter == false){
          return Tasks.find({'phase': 'Posttest'}).map(function (c){

                namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

                return {label: namevalue, value: c._id};;
              });
        } else {

          methodTasks = Methods.find({_id: {$in: selectedMethods}}).fetch();

          task_ids = [];

          // switching from [[]] to [] for next query.
          temp = methodTasks.map(function(a) {return a.method_tasks;}); 
          temp.forEach(function(element) {
            element.forEach(function(x) {
                task_ids.push(x);
            });
          });

          task_ids = task_ids.concat(AutoForm.getFieldValue('posttest_tasks'));

          return Tasks.find({'phase': 'Posttest', '_id': {$in: task_ids}}).map(function (c){

            namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

            return {label: namevalue, value: c._id};
          });
        }

      }
    }
 },

});

PracticalPlaningSchema = new SimpleSchema({
  participants: {
    type: Number,
    optional: true
  },
  location: {
    type: String,
    optional: true
  },
  participant_req: {
    type: Array,
    optional: true
  },
  'participant_req.$':{
    label: "Participat requirements",
    type: String
  },
   practical_url: {
    label: "Url",
    type: String,
    optional: true
  },
  practical_file: {
    label: "File",
    type: String,
    optional: true, 
     autoform: {
      afFieldInput:{
      type: 'fileUpload',
        collection: 'Uploads',
        label: 'Choose file'
      }
     }
  },
});

EthicalPlaningSchema = new SimpleSchema({
  information: {
    type: Array,
    optional: true
  },
  'information.$': {
    type: String
  },
   ethical_url: {
    label:"Url",
    type: String,
    optional: true
  },
  ethical_file: {
    label: "File",
    type: String,
    optional: true, 
     autoform: {
      afFieldInput:{
      type: 'fileUpload',
        collection: 'Uploads',
        label: 'Choose file'
      }
     }
  },
});





Studies.attachSchema(GoalSchema);
Studies.attachSchema(QuestionSchema);
Studies.attachSchema(MethodPlaningSchema);
Studies.attachSchema(StudyTaskSchema);
Studies.attachSchema(PracticalPlaningSchema);
Studies.attachSchema(EthicalPlaningSchema);









