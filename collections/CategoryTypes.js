import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

CategoryTypes = new Mongo.Collection('CategoryType');

CategoryTypes.allow({
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

CategoryTypes.attachSchema(BasicDescriptionSchema);
CategoryTypes.attachSchema(InterpretationHelpSchema);