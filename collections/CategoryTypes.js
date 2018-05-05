import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

CategoryTypes = new Mongo.Collection('CategoryType');

CategoryTypes.allow({
  insert: function(userId, doc){
    return !!userId;
  }
});

CategoryTypeSchema = new SimpleSchema({
   name: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    optional: true
  }

})

CategoryTypes.attachSchema(CategoryTypeSchema);