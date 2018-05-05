import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

DataTypes = new Mongo.Collection('DataType');

DataTypes.allow({
  insert: function(userId, doc){
    return !!userId;
  }
});

DataTypeSchema = new SimpleSchema({
  name: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    optional: true
  }

})

DataTypes.attachSchema(DataTypeSchema);