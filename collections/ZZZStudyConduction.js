import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

StudyConduction = new Mongo.Collection('StudyConduction');


StudyConduction.allow({
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

StudyConductionSchema = new SimpleSchema({

  participant_count: {
    type: Number,
    optional: true,
    autoform: {
      type:"hidden"
    }
  },

  study_id: {
    type: String,
    optional: true,
      autoform: {
        type: "hidden"
      }
  },


});

StudyConduction.attachSchema(StudyConductionSchema);


Taskarray = new SimpleSchema({
  participant_count: {
    type: Number,
    optional: true,
    autoform: {
      type:"hidden"
    }
  },
  study_id:{
    type:String,
        optional: true,
      autoform: {
        type: "hidden"
      }
  },

  index: {
    type: Number,
        optional: true,
      autoform: {
        type: "hidden"
      }
  },

  tasks: {
    type: Array,
    label:false,
  },

  'tasks.$': {
    type: Object,
    label:false,
  },

   'tasks.$.task_id': {
    type: String,
    optional:true,
    autoform: {
    afFieldInput: {
        type: "hidden"
       },
       afFormGroup: {
             label: false
        }
    }
  },

  'tasks.$.comment': {
    type: String,
    optional: true,
    defaultValue: "",
    autoform:{
      rows: 5
    }
  },

  'tasks.$.resultfile': {
    type: String,
    optional: true,
     autoform: {
      type: 'fileUpload',
        collection: 'Uploads',
        label: 'Result file'
     }
  },

  'tasks.$.status': {
    type:Number,
    optional:true,
    defaultValue: 0,
    allowedValues: [0, 1, 2],
     autoform: {
      type:"select2",
      label: "Status",
      options: [
          {label: "Open", value: 0},
          {label: "Completed", value: 1},
          {label: "Failed", value: 2}]
    }
  },
  'tasks.$.counter_balancing_group':{
    type:Number,
    optional:true,
    defaultValue:0,
    autoform:{
      type:"hidden"
    }
  }

});

TaskarrayCollection = new Mongo.Collection('TaskarrayCollection');

TaskarrayCollection.attachSchema(Taskarray);

TaskarrayCollection.allow({
  insert: function(userId, doc){
    return !!userId;
  },
  update: function(userId, doc){
    return !!userId;
  },
  remove: function(userId, doc){
    return !!userId;
  }

});