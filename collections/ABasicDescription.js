import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

BasicDescriptionSchema = new SimpleSchema({
  name: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    optional: true
  },
  author: {
    optional: true,
  type: String,
  label: "Author",
  autoValue: function(){
    if (this.isInsert) {
        if(this.userId){
			return this.userId;
		}
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
 },

})