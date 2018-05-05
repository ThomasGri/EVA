import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Tasks = new Mongo.Collection('Tasks');

Tasks.allow({
  insert: function(userId, doc){
    return !!userId;
  }
});

TasksSchema = new SimpleSchema({
  name: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    optional: true
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

Tasks.attachSchema(TasksSchema);