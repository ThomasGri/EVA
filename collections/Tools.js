import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Tools = new Mongo.Collection('Tools');

Tools.allow({
  insert: function(userId, doc){
    return !!userId;
  }
});

ToolsSchema = new SimpleSchema({
  name: {
    type: String,
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
  	type: String,
  	optional: true, 
     autoform: {
      afFieldInput:{
      type: 'fileUpload',
        collection: 'Uploads',
        label: 'Choose file'
      }
     }
  },
  practical_problems: {
 type: Array,
 optional: true,
 },
 'practical_problems.$':{
     type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      placeholder: 'Comma spaced list of occupations',
      options: function () {

    return PracticalProblems.find({}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

      return {label: namevalue, value: c._id};;
    });
}
    }
 },

ethical_problems: {
    type: Array,
    optional:true,
  },
   'ethical_problems.$':{
    type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      placeholder: 'Comma spaced list of occupations',
      options: function () {

    return EthicalProblems.find({}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

      return {label: namevalue, value: c._id};;
    });
}
    }
  },

});

Tools.attachSchema(ToolsSchema);