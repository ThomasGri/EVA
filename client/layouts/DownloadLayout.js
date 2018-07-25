Template.DownloadLayout.onCreated(function() {

	// id of study to determine the correct participant sheets.
	id = FlowRouter.getParam('id');

	participant = FlowRouter.getParam('participant');

	Meteor.call('generate_pdf', id, participant, function(err, res) {
		if (err) {
			console.error(err);
		} else if (res) {

			$("#ManualFrame").attr("height", screen.height);
			$("#ManualFrame").attr("width", screen.width);
			$("#ManualFrame").attr("src", "data:application/pdf;base64," + res);

		}
	})
	
});