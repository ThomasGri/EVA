import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

PracticalProblems = new Mongo.Collection('PracticalProblems');

PracticalProblems.allow({
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

PracticalProblems.attachSchema(BasicDescriptionSchema);
PracticalProblems.attachSchema(ExtendedDescriptionSchema);