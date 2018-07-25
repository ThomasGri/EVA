import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Tools = new Mongo.Collection('Tools');

Tools.allow({
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

Tools.attachSchema(BasicDescriptionSchema);
Tools.attachSchema(ExtendedDescriptionSchema);