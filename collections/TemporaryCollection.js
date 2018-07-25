import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

TemporaryCollection = new Mongo.Collection('TemporaryCollection');

TemporaryCollection.allow({
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


TemporarySchema = new SimpleSchema({
  counter_balancing_type: {
    type:Number,
    optional:true,
    defaultValue:0,
    allowedValues: [0, 1, 2, 3],
     autoform: {
      type:"select2",
      options: [
          {label: "None", value: 0},
          {label: "Complete", value: 1},
          {label: "Latin Square", value: 2},
          {label: "Reverse", value: 3}]
    }
  },
  study_id: {
    type: String,
    optional: true,
    defaultValue: "",
      autoform: {
        type: "hidden"
      }
  },
  participant_count:{
    type: Number,
    optional: true,
        defaultValue: 0,
      autoform: {
        type: "hidden"
      }
  },
  tasks: {
    type: Array,
    label: false,
    optional:true,
  },
  'tasks.$': {
    type: Object,
    optional:true,
    label:false,
  },

  'tasks.$.name':{
    type: String,
    optional:true,
    label: "Task",
    autoform:{
      disabled:true
    }
  },

  'tasks.$.counter_balancing_group': {
    type:Number,
    optional:true,
    defaultValue: 0,
    label:"Counterbalance Task?",
    allowedValues: [0, 1],//, 2, 3],
     autoform: {
      type:"select2",
      options: [
          {label: "No", value: 0},
          {label: "Yes", value: 1}]//, //{label: "2", value: 2}, //{label: "3", value: 3}]
    }
  },

  'tasks.$.phase':{
    type: String,
    optional:true,
    label: "Phase",
    autoform:{
      readonly:true
    }
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




});

TemporaryCollection.attachSchema(TemporarySchema);