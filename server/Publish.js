/** Studies */
Meteor.publish('studies', function(){ // studies visible to the user
	return Studies.find({$or:[{author: this.userId}, {collaborators: this.userId}, {public:true}]});
});

Meteor.publish('mystudies', function(){ // Studies on which user is working
	return Studies.find({$or:[{author: this.userId}, {collaborators: this.userId}]});
});

Meteor.publish('singleStudy', function(id){
	check(id, String);
	return Studies.find({_id: id});
});


/** Methods */
Meteor.publish('methods', function(){
	return Methods.find({});
});

Meteor.publish('singleMethod', function(id){
	check(id, String);
	return Methods.find({_id: id});
});


/** Tasks **/
Meteor.publish('tasks', function () {
  return Tasks.find({});
});


/** Tools **/
Meteor.publish('tools', function () {
  return Tools.find({});
});

/** Users **/
Meteor.publish('allUsers', function(){

	return Meteor.users.find({});

});

Meteor.publish("collaborators", function () {
	return Meteor.users.find({});
});


/** Partial Collections of New Method

/** Ethical Problems **/
Meteor.publish('ethicalProblems', function () {
  return EthicalProblems.find({});
});

Meteor.publish('categoryTypes', function () {
  return CategoryTypes.find({});
});

Meteor.publish('dataTypes', function () {
  return DataTypes.find({});
});

Meteor.publish('practicalProblems', function () {
  return PracticalProblems.find({});
});

Meteor.publish('superTypes', function () {
  return SuperTypes.find({});
});



Meteor.publish('uploads', function(){
	return Uploads.find({});
});