import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email'

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

  // General recommended Template
  template = Studies.find({"_id": 'SZarMMuerLZGrJ94x'}).fetch();

  if(template.length === 0){
    console.log("No template");

    var template = 
    {
      "_id": "SZarMMuerLZGrJ94x",
      "name": "Recommended Template",
      "public": true,
      "createdAt": new Date(),
      "participants": 6,
      "filter_tasks": false,
      "counter_balancing": 0,
      "author": "ecfCjQgyGLJKE63vW",
      "status": "In Planning"
    };

    Studies.insert(template);
  }

  // Example Data for evaluating EVA

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
