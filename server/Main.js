import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL = "smtps://evaluation.study.tool%40gmail.com:harrypotter1+-@smtp.gmail.com:465";
  
  Accounts.emailTemplates.from='evaluation.study.tool@gmail.com';
  Accounts.emailTemplates.sitename='EVA - Plan, Conduct &amp; Evaluate Studies';

  Accounts.emailTemplates.verifyEmail.subject = function(user){
    return 'Confirm your Email Address';
  }

  Accounts.emailTemplates.verifyEmail.text = function(user, url){
    return 'Click on the following link to verify your email address: ' + url;
  }

  
  // Check if default data exists. If not insert default dataset into EVA.
  template = Studies.find({"_id": 'SZarMMuerLZGrJ94x'}).fetch();

  if(template.length === 0){
	console.log("No template found -- initialising default data.");
	
	// default user account of Admin
	var temp =
	{
	  "_id": "b5J2ERvac5JoAZGgW",
	  "emails": [
		{
		  "address": "thomas.grimmeisen@uni-konstanz.com",
		  "verified": true
		}
	  ],
	  "profile": {
		"firstName": "Thomas",
		"lastName": "Grimmeisen"
	  },
	  "roles": [
		"normal-user"
	  ]
	}
	Meteor.users.insert(temp);

	Accounts.setPassword("b5J2ERvac5JoAZGgW", "eragon")

	// Files -- other elements use this. -- Not implemented yet.

	// Super Type
	var temp =
	{
	  "_id": "MAZCwWwPe4CAzWDCM",
	  "name": "Analytical Methods",
	  "description": "Contain all evaluation methods which do not use real user interaction with the system. They are used by experts to analyze certain usability criteria theoretically.",
	  "interpretation_advice": "Do not interpret results gathered by such methods as real world user reviews.",
	  "presentation_options": "Strictly separate the results from such gathered with real users while presenting.",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	SuperTypes.insert(temp);
	
	var temp =
	{
	  "_id": "erXT2vZxXjf5BooqX",
	  "name": "Empirical Methods",
	  "description": "Empirical Methods contain all methods which involve real users intteracting with the system.",
	  "interpretation_advice": "Be careful about gerneralising the findings you made with your participants.",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	SuperTypes.insert(temp);

	// Category Types
	var temp = 
	{
	  "_id": "TSR7EBvo9DgY4wnZX",
	  "name": "Physiological Methods",
	  "description": "Physiological methods gather specific body actions of participants. For example their brain activity or their skin temperature. Thereby physiological methods can be used to meassure user emotions in quantitative data.",
	  "evaluation_advice": "Consider small distortions between datasets which happen due to inaccurate recording devices.",
	  "interpretation_advice": "Consider small distortions between datasets which happen due to inaccurate recording devices.",
	  "evaluation_url": "https://www.sciencedirect.com/science/article/pii/S1877050911000172",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	CategoryTypes.insert(temp);

	// Data Type
	var temp = 
	{
	  "_id": "djkXorysgBuDERRdA",
	  "name": "Quantitative Data",
	  "description": "Quantitative data is data expressing a certain quantity, amount or range. Usually, there are measurement units associated with the data, e.g. metres, in the case of the height of a person. It makes sense to set boundary limits to such data, and it is also meaningful to apply arithmetic operations to the data.",
	  "evaluation_advice": "Arithmetic operations can be applied to the gathered data.",
	  "author": "b5J2ERvac5JoAZGgW",
	  "evaluation_url": "https://stats.oecd.org/glossary/detail.asp?ID=2219"
	}
	DataTypes.insert(temp);
	
	var temp = 
	{
	  "_id": "P6JZkG3f7mBGoHMJ3",
	  "name": "Qualitative Data",
	  "description": "Qualitative data is data describing the attributes or properties that an object possesses. The properties are categorized into classes that may be assigned numeric values. However, there is no significance to the data values themselves, they simply represent attributes of the object concerned.",
	  "evaluation_advice": "Do not perform arithmetic operations on any numbers. They are insignificant and have no internal value.",
	  "author": "b5J2ERvac5JoAZGgW",
	  "evaluation_url": "https://stats.oecd.org/glossary/detail.asp?ID=3494"
	}
	DataTypes.insert(temp);

	// Ethical Problem
	var temp =
	{
	  "_id": "zeZEwuEhJp8cfJMhf",
	  "name": "Privacy of the participants",
	  "description": "It is important to secure the privacy of data gathered during the study. Additionally the participants must be informed about the urther usage of gathered data. Additional information can be found in the attached Url.",
	  "url": "https://www.nngroup.com/articles/users-real-data/",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	EthicalProblems.insert(temp);
	
	var temp =
	{
	  "_id": "RxcWvwvy67GQeLBss",
	  "name": "Informed Consent",
	  "description": "Before any testing can be done with the users they must be introduced to the purpose of the study and what they have to expect during their participation. If the participant agrees to take part in the study he has to sign the attached document. Further information can be found in the attached Url.",
	  "url": "https://www.userfocus.co.uk/articles/what_user_researchers_ought_to_know_about_informed_consent.html",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	EthicalProblems.insert(temp);
	
	// Practical Problem
	var temp =
	{
	  "_id": "mC4quPcbi6nWLDp8A",
	  "name": "Eye-Tracker required",
	  "description": "This Method requires an Eye-Tracker to be applied successully. Ensure that the Eye-Tracker is compatible with your interaction device.",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	PracticalProblems.insert(temp);
	
	var temp =
	{
	  "_id": "fuc5xPRDk7KkfhTAG",
	  "name": "Silent environment required",
	  "description": "The audio recording requires a quiet surrounding. Otherwise the gathered data might be unusable.",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	PracticalProblems.insert(temp);

	// Tools
	var temp =
	{
	  "_id": "mgR2BD729BsypJh9E",
	  "name": "E-Prime",
	  "description": "E-Prime provides an environment for computerized experiment design, data collection, and analysis.",
	  "url": "https://pstnet.com/products/e-prime/",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	Tools.insert(temp);
	
	var temp =
	{
	  "_id": "LJAj836Bzdbd7Qh7u",
	  "name": "Noldus Observer XT",
	  "description": "Noldus Observer is a tool which can be used to gather, analyze and present behavioral data of participants.",
	  "url": "https://www.noldus.com/human-behavior-research/products/the-observer-xt?gclid=CjwKCAiAgrfhBRA3EiwAnfF4tlv0lFX93TUXJd6Kzo93rgNm_q0YNeh8It-_oYmWTkSFJH4BNr_0khoCHzsQAvD_BwE",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	Tools.insert(temp);
	

	// Methods



	// Tasks

	// Studies

	// General recommended Template
    var template = 
    {
      "_id": "SZarMMuerLZGrJ94x",
      "name": "Recommended Template",
      "public": true,
      "createdAt": new Date(),
      "participants": 6,
      "filter_tasks": false,
      "counter_balancing": 0,
      "author": "b5J2ERvac5JoAZGgW",
      "status": "In Planning"
    };

    Studies.insert(template);
  }

});

// Give the user the Normal user role.
var postSignUp = function(userId, info){
	Roles.addUsersToRoles(userId, ['normal-user', info.profile.profession]);
}

AccountsTemplates.configure({
	postSignUpHook: postSignUp,
  //enforceEmailVerification: true,
  sendVerificationEmail:true,

  overrideLoginErrors: false,

  showForgotPasswordLink: true,
  showResendVerificationEmailLink: true,
});




// Server: Define a method that the client can call.
Meteor.methods({
  sendEmail(to, from, subject, text) {

    // Make sure that all arguments are strings.
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running, without
    // waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      html: text
    });
  },


  resendVerificationEmail(userId){
     Accounts.sendVerificationEmail(userId);
  },

  // Method heavily inspired from: https://medium.com/@ryanswapp/getting-started-with-meteor-and-react-d411a87a1674
  'generate_pdf'(study_id, participant) {

      // SETUP
      // Grab required packages
      var webshot = Npm.require('webshot');
      var fs      = Npm.require('fs');
      var Future = Npm.require('fibers/future');
 
      var fut = new Future();
 
      var fileName = "checklist.pdf";
 
      // GENERATE HTML STRING
      var css = Assets.getText('bootstrap.min.css');
 
      SSR.compileTemplate('layout', Assets.getText('layout.html'));
 
      Template.layout.helpers({
        getDocType: function() {
          return "<!DOCTYPE html>";
        }
      });
 
      SSR.compileTemplate('checklist_report', Assets.getText('checklist.html'));

      // fix off by one
      participant--;
 
      // Get the Taskarray of the Study + Participant
      checklist = TaskarrayCollection.findOne({"study_id": study_id, "index": participant});

      // Merge in the Study Name etc
      study = Studies.findOne({"_id": study_id});
      checklist.study = study;

      // Get Task Metadata.
      checklist.tasks.forEach(function(task_execution, index){

        task_complete = Tasks.findOne({"_id": task_execution.task_id});

        if(!(typeof task_complete.file === "undefined")){
          task_complete.file = Uploads.findOne({"_id": task_complete.file});
        }
        number = index + 1;

        task_complete.number = number;

        task_execution.task = task_complete;

        console.log(task_complete);
      });

      checklist.index++;

      console.log(checklist);

      // pass data to template
      var data = {
        checklist: [checklist]
      };
 
      var html_string = SSR.render('layout', {
        css: css,
        template: "checklist_report",
        data: data
      });
    
 
          // Setup Webshot options
      var options = {
          //renderDelay: 2000,
          "paperSize": {
              "format": "Letter",
              "orientation": "portrait",
              "margin": "2.5cm"
          },
          siteType: 'html'
      };
 
      // Commence Webshot
      webshot(html_string, fileName, options, function(err) {
          fs.readFile(fileName, function (err, data) {
              if (err) {
                  return console.log(err);
              }
 
              fs.unlinkSync(fileName);
              fut.return(data);
 
          });
      });
      
      let pdfData = fut.wait();
      let base64String = new Buffer(pdfData).toString('base64');
 
      return base64String;

  }
});
