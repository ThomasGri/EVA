import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

PracticalProblems = new Mongo.Collection('PracticalProblems');

PracticalProblems.allow({
  insert: function(userId, doc){
    return !!userId;
  }
});

PracticalProblemsSchema = new SimpleSchema({
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
  	type: Object,
  	optional: true,
  	 autoform: {
  	 	type: 'fileUpload',
        collection: 'Uploads',
        label: 'Choose file'
  	 }
  }

})

PracticalProblems.attachSchema(PracticalProblemsSchema);