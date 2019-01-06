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

	var temp =
	{
	  "_id": "kmFcTFGoftWsDCoZr",
	  "name": "Hard to determine the tasks to be evaluated",
	  "description": "It is hard to know which tasks the end user will use frequently. The selection of the tasks to be evaluated needs to be done carefully.",
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

	var temp =
	{
	  "_id": "wnWDLpJuhJrs6PyGf",
	  "name": "Unipark",
	  "description": "Unipark is a tool which allows you to create, publish and analyze questionnaires and their results online.",
	  "url": "https://www.unipark.com/",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	Tools.insert(temp);

	var temp =
	{
	  "_id": "XdWsBPiTk6RntumRB",
	  "name": "Microphone (transportable)",
	  "description": "A transportable microphone which is used to record audio. It should have sufficient quality for your specific purpose.",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	Tools.insert(temp);

	var temp =
	{
	  "_id": "6Rti3CYr69u86aZis",
	  "name": "Office tools",
	  "description": "Different Office tools which can be used to create documents or checklists. Examples are Microsoft Office, Google Docs or Open Office.",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	Tools.insert(temp);

	var temp =
	{
	  "_id": "kPge99wbg7SKJKPfj",
	  "name": "Pen & Paper",
	  "description": "Universal Tool to note findings.",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	Tools.insert(temp);

	var temp =
	{
	  "_id": "F8Y5aCiPfGJd2tMfw",
	  "name": "Screen Recorder",
	  "description": "Tool to record the screen during interaction. Also allows to edit the captured videos.",
	  "url": "https://www.movavi.de/screen-recorder/",
	  "author": "b5J2ERvac5JoAZGgW"
	}
	Tools.insert(temp);

	// Methods
	var temp =
	{
	  "_id": "zXWnEAkdkrJWtFZvr",
	  "name": "Questionnaires",
	  "super_type": "erXT2vZxXjf5BooqX",
	  "gathered_data_type": [
	    "djkXorysgBuDERRdA",
	    "P6JZkG3f7mBGoHMJ3"
	  ],
	  "ethical_problems": [
	    "zeZEwuEhJp8cfJMhf"
	  ],
	  "planing_tools": [
	    "wnWDLpJuhJrs6PyGf"
	  ],
	  "conduction_tools": [
	    "wnWDLpJuhJrs6PyGf"
	  ],
	  "analysis_tools": [
	    "wnWDLpJuhJrs6PyGf"
	  ],
	  "author": "b5J2ERvac5JoAZGgW",
	  "description": "Questionnaires can be used to quickly gather data from your participants. They work best if the answers can be standardized. Otherwise it might be beneficial to use interviews instead.",
	  "evaluation_advice": "Be careful about answers to open questions which are not clearly.",
	  "method_tasks": [
	    "XmB55coMcL4AgvcHs",
	    "rLwdMyjZ4ZepDKS8e",
	    "XnRX8euB2FMTAjPsr"
	  ]
	}
	Methods.insert(temp);

	var temp =
	{
	  "_id": "bmxabeDprf7F7iGGZ",
	  "name": "Interviews",
	  "super_type": "erXT2vZxXjf5BooqX",
	  "description": "Interviews can be used to gain information about the participant and their experience while interacting with the tested tool. They offer more detailed information but are harder to evaluate than questionnaires.",
	  "gathered_data_type": [
	    "djkXorysgBuDERRdA",
	    "P6JZkG3f7mBGoHMJ3"
	  ],
	  "practical_problems": [
	    "fuc5xPRDk7KkfhTAG"
	  ],
	  "ethical_problems": [
	    "zeZEwuEhJp8cfJMhf"
	  ],
	  "planing_tools": [
	    "XdWsBPiTk6RntumRB"
	  ],
	  "conduction_tools": [
	    "XdWsBPiTk6RntumRB",
	    "kPge99wbg7SKJKPfj"
	  ],
	  "presentation_options": "The the possibilities of presentation for gathered data highly depends on the data itself. Therefor no guidance can be given.",
	  "author": "b5J2ERvac5JoAZGgW",
	  "method_tasks": [
	    "2X6CuZzJtX6hJ4R9H"
	  ]
	}
	Methods.insert(temp);

	var temp =
	{
	  "_id": "3LsAEdeFnfGGd49FQ",
	  "name": "Eye-Tracking",
	  "super_type": "erXT2vZxXjf5BooqX",
	  "category_type": [
	    "TSR7EBvo9DgY4wnZX"
	  ],
	  "description": "During interaction the participants eye-movements can be tracked to check which areas attract the participants attention. Additionally it can be checkt if the participant completely overlooked e.g. a button.",
	  "gathered_data_type": [
	    "djkXorysgBuDERRdA"
	  ],
	  "practical_problems": [
	    "mC4quPcbi6nWLDp8A"
	  ],
	  "ethical_problems": [
	    "zeZEwuEhJp8cfJMhf"
	  ],
	  "evaluation_advice": "Be aware about minor inaccuracies when working with Eye-Trackers. Do not overinterpret them since Eye-Trackers are not 100% accurate.",
	  "presentation_options": "The gathered data can be visualized using gazepaths or heatmaps. The software shipped with the Eye-Tracker should provide the option to create them.",
	  "author": "b5J2ERvac5JoAZGgW",
	  "method_tasks": [
	    "pX5qfFxqoBBspAia4",
	    "5ZuDy9uZh2ReBBv9v"
	  ]
	}
	Methods.insert(temp);

	var temp =
	{
	  "_id": "ANxgbbTAw2hJu93ph",
	  "name": "Cognitive Walkthrough",
	  "super_type": "MAZCwWwPe4CAzWDCM",
	  "description": "The cognitive walkthrough is a usability evaluation method in which one or more evaluators work through a series of tasks and ask a set of questions from the perspective of the user. In-depth information can be found at the Url.",
	  "gathered_data_type": [
	    "P6JZkG3f7mBGoHMJ3",
	    "djkXorysgBuDERRdA"
	  ],
	  "practical_problems": [
	    "kmFcTFGoftWsDCoZr"
	  ],
	  "planing_tools": [
	    "6Rti3CYr69u86aZis"
	  ],
	  "conduction_tools": [
	    "6Rti3CYr69u86aZis",
	    "kPge99wbg7SKJKPfj"
	  ],
	  "presentation_tools": [
	    "6Rti3CYr69u86aZis"
	  ],
	  "url": "https://www.usabilitybok.org/cognitive-walkthrough",
	  "author": "b5J2ERvac5JoAZGgW",
	  "method_tasks": [
	    "h4CA3po485bM2rAPr"
	  ]
	}
	Methods.insert(temp);

	var temp =
	{
	  "_id": "vqhXRDRrdomjdsuCq",
	  "name": "Heuristic Evaluation",
	  "super_type": "MAZCwWwPe4CAzWDCM",
	  "description": "A usability evaluation method in which one or more reviewers, preferably experts, compare a software, documentation, or hardware product to a list of design principles (commonly referred to as heuristics) and identify where the product does not follow those principles. Detailed information can be found at the Url.",
	  "gathered_data_type": [
	    "djkXorysgBuDERRdA",
	    "P6JZkG3f7mBGoHMJ3"
	  ],
	  "url": "https://www.usabilitybok.org/heuristic-evaluation",
	  "author": "b5J2ERvac5JoAZGgW",
	  "method_tasks": [
	    "EyPYFjQ7x5oWGDNYc"
	  ]
	}
	Methods.insert(temp);

	var temp =
	{
	  "_id": "w5PXQgKtpdk9BRsDt",
	  "name": "Screen Recording",
	  "super_type": "erXT2vZxXjf5BooqX",
	  "description": "Screen Recording can be used to get a comprehensive picture of the participants mouse movements and navigation within the tool. It is especially useful if a observation of the userinteraction would be intrusive to the participant.",
	  "gathered_data_type": [
	    "djkXorysgBuDERRdA"
	  ],
	  "conduction_tools": [
	    "F8Y5aCiPfGJd2tMfw"
	  ],
	  "analysis_tools": [
	    "F8Y5aCiPfGJd2tMfw"
	  ],
	  "author": "b5J2ERvac5JoAZGgW",
	  "method_tasks": [
	    "pX5qfFxqoBBspAia4",
	    "5ZuDy9uZh2ReBBv9v",
	    "h4CA3po485bM2rAPr"
	  ]
	}
	Methods.insert(temp);

	// Tasks
	var temp =
	{
	  "_id": "XmB55coMcL4AgvcHs",
	  "name": "Demographic Questionnaire",
	  "description": "Demographic Questionnaires are used to gather some personal data about your participants. This can be useful to deduct correlations between demographic data and test results. Additional information can be found in the Url.",
	  "methods": [
	    "zXWnEAkdkrJWtFZvr"
	  ],
	  "phase": "Pretest",
	  "url": "https://www.surveymonkey.com/mp/gathering-demographic-information-from-surveys/",
	  "author": "b5J2ERvac5JoAZGgW",
	  "phaseint": 0
	}
	Tasks.insert(temp);

	var temp =
	{
	  "_id": "rLwdMyjZ4ZepDKS8e",
	  "name": "NASA TLX",
	  "description": "The NASA Task Load Index (TLX) provides multi-dimensional ratings of overall workload based on a weighted average of six subscales: mental demands, physical demands, temporal demands, performance, effort, and frustration.",
	  "methods": [
	    "zXWnEAkdkrJWtFZvr"
	  ],
	  "phase": "Posttest",
	  "url": "http://humansystems.arc.nasa.gov/groups/TLX/downloads/TLXScale.pdf",
	  "author": "b5J2ERvac5JoAZGgW",
	  "phaseint": 2
	}
	Tasks.insert(temp);

	var temp =
	{
	  "_id": "XnRX8euB2FMTAjPsr",
	  "name": "System Usability Scale (SUS)",
	  "description": "The System Usability Scale (SUS) provides a “quick and dirty”, reliable tool for measuring the usability.   It consists of a 10 item questionnaire with five response options for respondents; from Strongly agree to Strongly disagree.  Originally created by John Brooke in 1986, it allows you to evaluate a wide variety of products and services, including hardware, software, mobile devices, websites and applications.  The document can be found in the attached Url.",
	  "methods": [
	    "zXWnEAkdkrJWtFZvr"
	  ],
	  "phase": "Posttest",
	  "url": "https://www.measuringux.com/SUS.pdf",
	  "evaluation_advice": "The scoring system is somewhat complex.\nThere is a temptation, when you look at the scores, since they are on a scale of 0-100, to interpret them as percentages, they are not.\nThe best way to interpret your results involves “normalizing” the scores to produce a percentile ranking.\nSUS is not diagnostic - its use is in classifying the ease of use of the site, application or environment being tested.",
	  "interpretation_advice": "Interpreting scoring can be complex. The participant’s scores for each question are converted to a new number, added together and then multiplied by 2.5 to convert the original scores of 0-40 to 0-100.  Though the scores are 0-100, these are not percentages and should be considered only in terms of their percentile ranking.\n\nBased on research, a SUS score above a 68 would be considered above average and anything below 68 is below average, however the best way to interpret your results involves “normalizing” the scores to produce a percentile ranking.",
	  "evaluation_url": "https://www.usability.gov/how-to-and-tools/methods/system-usability-scale.html",
	  "author": "b5J2ERvac5JoAZGgW",
	  "phaseint": 2
	}
	Tasks.insert(temp);

	var temp = 
	{
	  "_id": "EyPYFjQ7x5oWGDNYc",
	  "name": "Usability heuristics (Nielsen)",
	  "description": "Apply the 10 Heuristics for for User Interface Design by Jacob Nielsen.",
	  "methods": [
	    "vqhXRDRrdomjdsuCq"
	  ],
	  "phase": "Test",
	  "url": "https://www.nngroup.com/articles/ten-usability-heuristics/",
	  "author": "b5J2ERvac5JoAZGgW",
	  "phaseint": 1
	}
	Tasks.insert(temp);

	var temp =
	{
	  "_id": "pX5qfFxqoBBspAia4",
	  "name": "Browse the Website for 5 minutes.",
	  "description": "The participant freely navigates the application which is evaluated.",
	  "methods": [
	    "w5PXQgKtpdk9BRsDt",
	    "3LsAEdeFnfGGd49FQ"
	  ],
	  "phase": "Test",
	  "interpretation_advice": "Find out which Navigation elements were most used. Verify if all navigation elements are visible enough.",
	  "author": "b5J2ERvac5JoAZGgW",
	  "phaseint": 1
	}
	Tasks.insert(temp);

	var temp =
	{
	  "_id": "5ZuDy9uZh2ReBBv9v",
	  "name": "Sign up for the newsletter.",
	  "description": "The participant is asked to sign up for the newsletter of the tested application.",
	  "methods": [
	    "w5PXQgKtpdk9BRsDt",
	    "3LsAEdeFnfGGd49FQ"
	  ],
	  "phase": "Test",
	  "evaluation_advice": "If the task can not be solved find out why.",
	  "interpretation_advice": "If multiple ways of reaching the goal exist investigate which is more frequently used (and why).",
	  "author": "b5J2ERvac5JoAZGgW",
	  "phaseint": 1
	}
	Tasks.insert(temp);

	var temp =
	{
	  "_id": "2X6CuZzJtX6hJ4R9H",
	  "name": "Interview Questions (Website review)",
	  "description": "A template with questions that can be asked after the participant interacted with a website / application.",
	  "methods": [
	    "bmxabeDprf7F7iGGZ"
	  ],
	  "phase": "Posttest",
	  "url": "https://docs.google.com/document/d/19cTZ2zxYfxSUsIdOBAZtJ3np1uEdflok3a8OvnZSwtU/edit?usp=sharing",
	  "author": "b5J2ERvac5JoAZGgW",
	  "phaseint": 2
	}
	Tasks.insert(temp);

	var temp =
	{
	  "_id": "h4CA3po485bM2rAPr",
	  "name": "Common Tasks of End-Users",
	  "description": "This document contains some common tasks which End-Users might need frequently.",
	  "methods": [
	    "ANxgbbTAw2hJu93ph",
	    "w5PXQgKtpdk9BRsDt"
	  ],
	  "phase": "Test",
	  "url": "https://docs.google.com/document/d/1hA_Ag66-U-FUMB65chDhQXiHmNEehfz9pDmhsJHD99Y/edit?usp=sharing",
	  "author": "b5J2ERvac5JoAZGgW",
	  "phaseint": 1
	}
	Tasks.insert(temp);	

	// Studies

	// General recommended Template
    var template = 
	{
	  "_id": "SZarMMuerLZGrJ94x",
	  "name": "Recommended Template",
	  "public": true,
	  "createdAt": "2019-01-06T22:31:20.595Z",
	  "participants": 6,
	  "filter_tasks": false,
	  "counter_balancing": 1,
	  "author": "b5J2ERvac5JoAZGgW",
	  "status": "In Planning",
	  "methods": [
	    "zXWnEAkdkrJWtFZvr",
	    "bmxabeDprf7F7iGGZ",
	    "3LsAEdeFnfGGd49FQ",
	    "w5PXQgKtpdk9BRsDt",
	    "vqhXRDRrdomjdsuCq"
	  ],
	  "posttest_tasks": [
	    "rLwdMyjZ4ZepDKS8e",
	    "2X6CuZzJtX6hJ4R9H"
	  ],
	  "pretest_tasks": [
	    "XmB55coMcL4AgvcHs"
	  ],
	  "information": [
	    "The participants must be truthfully informed about the purpose of the study and how the gathered data will be used.",
	    "Participants will receive a monetary reward for taking part in the study.",
	    "The study must be approved by the ethical department of the university."
	  ],
	  "participant_req": [
	    "Participants must be over 18 years old.",
	    "Participants must not be visually impaired (due to eye-tracking)"
	  ],
	  "test_tasks": [
	    "EyPYFjQ7x5oWGDNYc",
	    "pX5qfFxqoBBspAia4",
	    "h4CA3po485bM2rAPr"
	  ],
	  "location": "Media Room"
	};

    Studies.insert(template);


    // Helper tables of the template.

    var temp =
    {
	  "_id": "e4aaryL5p3pKPGDtQ",
	  "groups": [
	    {
	      "participants": 3,
	      "indexes": [
	        0,
	        2,
	        4
	      ],
	      "group": 0
	    },
	    {
	      "participants": 3,
	      "indexes": [
	        1,
	        3,
	        5
	      ],
	      "group": 1
	    }
	  ],
	  "study_id": "SZarMMuerLZGrJ94x"
	};
	CounterBalancing.insert(temp);

	var temp =
	{
	  "_id": "umsc2PSyF8tLh3YAd",
	  "study_id": "SZarMMuerLZGrJ94x",
	  "index": 0,
	  "participant_count": 6,
	  "tasks": [
	    {
	      "counter_balancing_group": 0,
	      "task_id": "XmB55coMcL4AgvcHs",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "EyPYFjQ7x5oWGDNYc",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "pX5qfFxqoBBspAia4",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "h4CA3po485bM2rAPr",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "rLwdMyjZ4ZepDKS8e",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "2X6CuZzJtX6hJ4R9H",
	      "status": 0,
	      "comment": ""
	    }
	  ]
	};
	TaskarrayCollection.insert(temp);

	var temp =
	{
	  "_id": "gPrpaSn5Nki8C5xfF",
	  "study_id": "SZarMMuerLZGrJ94x",
	  "index": 1,
	  "participant_count": 6,
	  "tasks": [
	    {
	      "counter_balancing_group": 0,
	      "task_id": "XmB55coMcL4AgvcHs",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "EyPYFjQ7x5oWGDNYc",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "h4CA3po485bM2rAPr",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "pX5qfFxqoBBspAia4",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "rLwdMyjZ4ZepDKS8e",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "2X6CuZzJtX6hJ4R9H",
	      "status": 0,
	      "comment": ""
	    }
	  ]
	}
	TaskarrayCollection.insert(temp);

	var temp =
	{
	  "_id": "p2NMLojkkeyNQexSx",
	  "study_id": "SZarMMuerLZGrJ94x",
	  "index": 2,
	  "participant_count": 6,
	  "tasks": [
	    {
	      "counter_balancing_group": 0,
	      "task_id": "XmB55coMcL4AgvcHs",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "EyPYFjQ7x5oWGDNYc",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "pX5qfFxqoBBspAia4",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "h4CA3po485bM2rAPr",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "rLwdMyjZ4ZepDKS8e",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "2X6CuZzJtX6hJ4R9H",
	      "status": 0,
	      "comment": ""
	    }
	  ]
	}
	TaskarrayCollection.insert(temp);

	var temp =
	{
	  "_id": "uAJJhPHcvJmw5QRE6",
	  "study_id": "SZarMMuerLZGrJ94x",
	  "index": 3,
	  "participant_count": 6,
	  "tasks": [
	    {
	      "counter_balancing_group": 0,
	      "task_id": "XmB55coMcL4AgvcHs",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "EyPYFjQ7x5oWGDNYc",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "h4CA3po485bM2rAPr",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "pX5qfFxqoBBspAia4",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "rLwdMyjZ4ZepDKS8e",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "2X6CuZzJtX6hJ4R9H",
	      "status": 0,
	      "comment": ""
	    }
	  ]
	}
	TaskarrayCollection.insert(temp);

	var temp =
	{
	  "_id": "G97cshBPrFNeiLkF9",
	  "study_id": "SZarMMuerLZGrJ94x",
	  "index": 4,
	  "participant_count": 6,
	  "tasks": [
	    {
	      "counter_balancing_group": 0,
	      "task_id": "XmB55coMcL4AgvcHs",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "EyPYFjQ7x5oWGDNYc",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "pX5qfFxqoBBspAia4",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "h4CA3po485bM2rAPr",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "rLwdMyjZ4ZepDKS8e",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "2X6CuZzJtX6hJ4R9H",
	      "status": 0,
	      "comment": ""
	    }
	  ]
	}
	TaskarrayCollection.insert(temp);

	var temp =
	{
	  "_id": "B884spk6PbMGs8zTr",
	  "study_id": "SZarMMuerLZGrJ94x",
	  "index": 5,
	  "participant_count": 6,
	  "tasks": [
	    {
	      "counter_balancing_group": 0,
	      "task_id": "XmB55coMcL4AgvcHs",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "EyPYFjQ7x5oWGDNYc",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "h4CA3po485bM2rAPr",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 1,
	      "task_id": "pX5qfFxqoBBspAia4",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "rLwdMyjZ4ZepDKS8e",
	      "status": 0,
	      "comment": ""
	    },
	    {
	      "counter_balancing_group": 0,
	      "task_id": "2X6CuZzJtX6hJ4R9H",
	      "status": 0,
	      "comment": ""
	    }
	  ]
	}
	TaskarrayCollection.insert(temp);


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
