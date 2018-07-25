import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

CounterBalancing = new Mongo.Collection('CounterBalancing');


CounterBalancing.allow({
  insert: function(userId, doc){
    return !!userId;
  },
  update: function(userId, doc){
    return !!userId;
  },
  remove: function(userId, doc){
    return !!userId;
  }

});

CounterBalancingSchema = new SimpleSchema({

	study_id:{
		type:String
	},

	groups: {
		type: Array
	},

	'groups.$': {
		type: Object
	},

	'groups.$.participants': {
		type: Number
	},

	'groups.$.group':{
		type: Number
	},

	'groups.$.indexes':{
		type: Array
	},

	'groups.$.indexes.$':{
		type: Number
	}
})