// Subscribe Template to Collection
Template.EthicalProblems.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('ethicalProblems');
        console.log("subscribed");
	});
});

// Find Method for the template Studies
Template.EthicalProblems.helpers({
	ethicalProblems: ()=> {
		return EthicalProblems.find({});
	}
});

Template.EthicalProblems.events({
  'click #new_ethicalProblem': function(event, template) {
    event.preventDefault();  
    FlowRouter.go('new-ethicalProblem');
  }
});

Template.EthicalProblems.helpers({
    settings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
                { key: 'name', label: 'Name' },
                { key: 'ethical_problem', label: 'Ethical Problem' }
            ]
        };
    }
});