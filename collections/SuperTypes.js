import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

SuperTypes = new Mongo.Collection('SuperTypes');

SuperTypes.allow({
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

SuperTypes.attachSchema(BasicDescriptionSchema);
SuperTypes.attachSchema(InterpretationHelpSchema);