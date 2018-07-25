import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

InterpretationHelpSchema = new SimpleSchema({

  evaluation_advice: {
    type: String,
    optional:true,
    max: 2000,
    autoform: {

      rows: 3
    }
  },

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
  evaluation_url: {
    type: String,
    optional: true
  },
   evaluation_file: {
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