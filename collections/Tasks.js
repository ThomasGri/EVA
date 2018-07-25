import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

Tasks = new Mongo.Collection('Tasks');

Tasks.allow({
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

TasksSchema = new SimpleSchema({

   methods: {
    type: Array,
    optional: true
  },
  'methods.$':{
      type: String,
    
    label: 'Name',
    autoform:{
      type:"select2",
      options: function () {

    return Methods.find({}).map(function (c){

      namevalue= "<strong>" + c.name + "</strong><br>" + c.description;

      return {label: namevalue, value: c._id};;
    });
}
    }
 },
 phase: {
  type: String,
  allowedValues: ["Pretest", "Test", "Posttest"],
  autoform: {
    type:"select2",
    options: [
        {label: "Pretest", value: "Pretest"},
        {label: "Test", value: "Test"},
        {label: "Posttest", value: "Posttest"}]
  }
 },

 phaseint: {
  type: Number,
  autoValue: function(){
    phase = this.field("phase").value;
    if (phase == "Pretest") {
        return 0;
    } else if (phase == "Test"){
      return 1;
    } else if (phase == "Posttest"){
      return 2;
    } else {
      return 3;
    }
  },
  autoform: {
   afFieldInput: {
    type: "hidden"
   },
   afFormGroup: {
         label: false
      }
  }
 }
 

});

Tasks.attachSchema(BasicDescriptionSchema);
Tasks.attachSchema(TasksSchema);
Tasks.attachSchema(ExtendedDescriptionSchema);
Tasks.attachSchema(InterpretationHelpSchema);