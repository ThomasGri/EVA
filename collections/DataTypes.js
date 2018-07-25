import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

DataTypes = new Mongo.Collection('DataType');

DataTypes.allow({
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

DataTypes.attachSchema(BasicDescriptionSchema);
DataTypes.attachSchema(InterpretationHelpSchema);