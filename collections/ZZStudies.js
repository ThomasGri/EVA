import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Studies = new Mongo.Collection('Studies');


Studies.allow({
  insert: function(userId, doc){
    return !!userId;
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
   url: {
    type: String,
    optional: true
  },
  file: {
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
   return this.userId;
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
   return "In Planing";
  },
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
   url: {
    type: String,
    optional: true
  },
  file: {
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
  url: {
    type: String,
    optional: true
  },
  file: {
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
    type: String
  },
   url: {
    type: String,
    optional: true
  },
  file: {
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
   url: {
    type: String,
    optional: true
  },
  file: {
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

StudySchema = new SimpleSchema({
	// Add attributes here

///////////////////////////////////////////////////

  goals: {
    type: GoalSchema,
    label: "Study Goals"
  },

  questions: {
    type: QuestionSchema,
    label: "Study Questions"
  },

  methodplaning: {
    type: MethodPlaningSchema,
    label: "Methods"
  },

   practical_planing: {
    type: PracticalPlaningSchema,
    label: "Practical Planing"
  },

  ethical_planing: {
    type: EthicalPlaningSchema,
    label: "Ethical Planing"
  },

});

//Studies.attachSchema(StudySchema);


Studies.attachSchema(GoalSchema);
Studies.attachSchema(QuestionSchema);
Studies.attachSchema(MethodPlaningSchema);
Studies.attachSchema(PracticalPlaningSchema);
Studies.attachSchema(EthicalPlaningSchema);