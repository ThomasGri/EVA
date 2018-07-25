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

Meteor.publish('studyConduction', function(){ // Conduction Phase of a study
	return StudyConduction.find({});
});

Meteor.publish('temporaryCollection', function(){
	return TemporaryCollection.find({});
});

Meteor.publish('taskarrayCollection', function(){
	return TaskarrayCollection.find({});
});

Meteor.publish('counterBalancing', function(){
	return CounterBalancing.find({});
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

Meteor.publish('singleTask', function(id){
	check(id, String);
	return Tasks.find({_id: id});
});

/** Tools **/
Meteor.publish('tools', function () {
  return Tools.find({});
});

Meteor.publish('singleTool', function(id){
	check(id, String);
	return Tools.find({_id: id});
});

/** Users **/
Meteor.publish('allUsers', function(){

	return Meteor.users.find({});

});

Meteor.publish("collaborators", function () {
	return Meteor.users.find({});
});


/** Partial Collections of New Method

/** Category Types **/
Meteor.publish('categoryTypes', function () {
  return CategoryTypes.find({});
});

Meteor.publish('singleCategoryType', function(id){
	check(id, String);
	return CategoryTypes.find({_id: id});
});

/** Ethical Problems **/
Meteor.publish('ethicalProblems', function () {
  return EthicalProblems.find({});
});

Meteor.publish('singleEthicalProblem', function(id){
	check(id, String);
	return EthicalProblems.find({_id: id});
});

/** Data Types **/
Meteor.publish('dataTypes', function () {
  return DataTypes.find({});
});

Meteor.publish('singleDataType', function(id){
	check(id, String);
	return DataTypes.find({_id: id});
});

/** Practical Problems **/
Meteor.publish('practicalProblems', function () {
  return PracticalProblems.find({});
});

Meteor.publish('singlePracticalProblem', function(id){
	check(id, String);
	return PracticalProblems.find({_id: id});
});

/** Super Types **/
Meteor.publish('superTypes', function () {
  return SuperTypes.find({});
});

Meteor.publish('singleSuperType', function(id){
	check(id, String);
	return SuperTypes.find({_id: id});
});


/** Uploads **/
Meteor.publish('uploads', function(){
	return Uploads.find({});
});