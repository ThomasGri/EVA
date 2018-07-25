import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

EthicalProblems = new Mongo.Collection('EthicalProblems');

EthicalProblems.allow({
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

EthicalProblems.attachSchema(BasicDescriptionSchema);
EthicalProblems.attachSchema(ExtendedDescriptionSchema);