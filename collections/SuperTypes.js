import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

SuperTypes = new Mongo.Collection('SuperTypes');

SuperTypes.allow({
  insert: function(userId, doc){
    return !!userId;
  }
});

SuperTypeSchema = new SimpleSchema({
  name: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    optional: true
  }

})

SuperTypes.attachSchema(SuperTypeSchema);