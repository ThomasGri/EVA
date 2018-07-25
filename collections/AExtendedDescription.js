import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

ExtendedDescriptionSchema = new SimpleSchema({
  url: {
  	type: String,
  	optional: true
  },
  file: {
  	type: String,
  	optional: true,
  	 autoform: {
  	 	type: 'fileUpload',
        collection: 'Uploads',
        label: 'Choose file'
  	 }
  }
})

