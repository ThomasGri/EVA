import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Methods = new Mongo.Collection('Methods');

Methods.allow({
  insert: function(userId, doc){
    return !!userId;
  }
});


MethodInformationSchema = new SimpleSchema({
   name: {
    type: String,
    label: "Method Name",
    unique: true,
    optional: true,
    autoform: {
      placeholder: "Enter the name of the method"
    }
  },
  super_type: {
     optional: true,
     type: String,
    
    label: 'Super Type',
    autoform:{
      type:"select2",
      
      options: function () {

    return SuperTypes.find({}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

      return {label: namevalue, value: c._id};;
    });
}
    }
 },
  category_type: {
    type: Array,
    optional: true
  },
  'category_type.$':{
      type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      placeholder: 'Comma spaced list of occupations',
      options: function () {

    return CategoryTypes.find({}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

      return {label: namevalue, value: c._id};;
    });
}
    }
 },
  description: {
    type: String,
    optional: true,
    max: 2000,
    autoform: {

      rows: 3
    }
  },
  gathered_data_type: {
    type: Array,
    optional: true
  },
   'gathered_data_type.$':{
    type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      placeholder: 'Comma spaced list of occupations',
      options: function () {

    return DataTypes.find({}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

      return {label: namevalue, value: c._id};;
    });
}
    }
  },
    author: {
  type: String,
  label: "Author",
  autoValue: function(){
   return this.userId;
  },
  autoform: {
   afFieldInput: {
    type: "hidden"
   },
   afFormGroup: {
         label: false
      }
  }
 },
});


MethodProblemsSchema = new SimpleSchema({
  practical_problems: {
 type: Array,
 optional: true
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


MethodToolSchema = new SimpleSchema({
  planing_tools: {
    type: Array,
    optional:true,
  },
   'planing_tools.$':{
    type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      placeholder: 'Comma spaced list of occupations',
      options: function () {

    return Tools.find({}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

      return {label: namevalue, value: c._id};;
    });
}
    }
  },
   conduction_tools: {
    type: Array,
    optional:true,
  },
   'conduction_tools.$':{
    type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      placeholder: 'Comma spaced list of occupations',
      options: function () {

    return Tools.find({}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

      return {label: namevalue, value: c._id};;
    });
}
    }
  }, analysis_tools: {
    type: Array,
    optional:true,
  },
   'analysis_tools.$':{
    type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      placeholder: 'Comma spaced list of occupations',
      options: function () {

    return Tools.find({}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

      return {label: namevalue, value: c._id};;
    });
}
    }
  },
  presentation_tools: {
    type: Array,
    optional:true,
  },
   'presentation_tools.$':{
    type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      placeholder: 'Comma spaced list of occupations',
      options: function () {

    return Tools.find({}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

      return {label: namevalue, value: c._id};;
    });
}
    }
  },
});


MethodAdditionalSchema = new SimpleSchema({

  interpretation_advice: {
    type: String,
  optional:true,
    max: 2000,
    autoform: {

      rows: 3
    }
  },
  presentation_options: {
    type: String,
  optional: true,
    max: 2000,
    autoform: {

      rows: 3
    }
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
})


Methods.attachSchema(MethodInformationSchema);
Methods.attachSchema(MethodProblemsSchema);
Methods.attachSchema(MethodToolSchema);
Methods.attachSchema(MethodAdditionalSchema);