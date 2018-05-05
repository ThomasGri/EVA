import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

EthicalProblems = new Mongo.Collection('EthicalProblems');

EthicalProblems.allow({
  insert: function(userId, doc){
    return !!userId;
  }
});

EthicalProblemsSchema = new SimpleSchema({
  name: {
    type: String,
    optional: false,
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

EthicalProblems.attachSchema(EthicalProblemsSchema);