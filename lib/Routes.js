
AccountsTemplates.configure({
    defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
    defaultTemplate: 'atForm',
    defaultLayout: 'ResetLayout',
    defaultLayoutRegions: {},
    defaultContentRegion: 'main'
});

/** Accounts **/
AccountsTemplates.configureRoute('resetPwd');


/** Login Sutff **/
if(Meteor.isClient){
	// redirect upon login
	Accounts.onLogin(function() {

		if(FlowRouter.current().route){
			// work around multiple triggers when refreshing.
			if(FlowRouter.current().route.name == "home") {
				console.log("This user logged in using the button");
				FlowRouter.go('my-studies');
		    }
		}
	});

	// redirect upon logout
	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}

// redirect if user is not logged in && url is not reset password.
FlowRouter.triggers.enter([function(context, redirect){

	if(FlowRouter.current().route.name == "atResetPwd"){ 
		// Don't redirect. Use custom route!.
	} else if(!Meteor.userId()){
		FlowRouter.go('home');
	}
	


}]);

// standard routes
FlowRouter.route('/', {
	name: 'home',
	action(){
		// redirect if user is logged in
		if(Meteor.userId()){
			FlowRouter.go('my-studies');
		}
	//	GAnalytics.pageview();
		BlazeLayout.render('HomeLayout');
	}
});


FlowRouter.route('/download/:id/:participant', {
	name: 'download',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('DownloadLayout');
	}
});

/** Admin **/
FlowRouter.route('/admin', {
	name: 'admin',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Admin'});
	}
});

var adminRoutes = FlowRouter.group({
	prefix: '/admin',
	name: 'admin'
})

adminRoutes.route('/users', {
	name:'users',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Users'});
	}
})

/** Studies **/
FlowRouter.route('/my-studies', {
	name: 'my-studies',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'MyStudies'});
	}
});

FlowRouter.route('/study-collection', {
	name: 'study-collection',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Studies'});
	}
});

FlowRouter.route('/create-study', {
	name: 'create-study',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'CreateStudy'});
	}
});

FlowRouter.route('/new-study/:step?', {
  name: 'new-study',
  action() {
    //if (!FlowRouter.current().queryParams.step) {

    	//console.log(FlowRouter.current());
    	//console.log(FlowRouter.current().queryParams);
    	//console.log(FlowRouter.current().params);

    	//if(FlowRouter.current().params.step){
    	//	console.log("query param is here");
    	//	Wizard.next();
    	//}

    	BlazeLayout.render('MainLayout', {main: 'NewStudy'});
    //} else {
     // BlazeLayout.render('MainLayout', {main: 'NewStudy',
     // 	step: this.params.step});
    //}
  }
});

FlowRouter.route('/view-study/:id', {
	name: 'view-study',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'StudySingle'});
	}
});

FlowRouter.route('/edit-study/:id/:step?', {
	name: 'edit-study',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'StudyAllWizards'});
	}
});

FlowRouter.route('/copy-study/:id/:step?', {
	name: 'copy-study',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewStudy'});
	}
});

FlowRouter.route('/compare-studies/:id/:id2', {
	name: 'compare-studies',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'CompareStudies'});
	}
});


/** Methods **/
FlowRouter.route('/method-collection', {
	name: 'method-collection',
	action(){
		//GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Methods'});
	}
});

FlowRouter.route('/new-method/:step?', {
  name: 'new-method',
  action() {
    //if (!FlowRouter.current().queryParams.step) {
    	BlazeLayout.render('MainLayout', {main: 'NewMethod'});
    //} else {
     // BlazeLayout.render('MainLayout', {main: 'NewStudy',
     // 	step: this.params.step});
    //}
  }
});

FlowRouter.route('/edit-method/:id/:step?', {
	name: 'edit-method',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewMethod'});
	}
});

FlowRouter.route('/view-method/:id', {
	name: 'view-method',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'MethodSingle'});
	}
});


/** Tasks **/
FlowRouter.route('/task-collection', {
	name: 'task-collection',
	action(){
		//GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Tasks'});
	}
});

FlowRouter.route('/new-task', {
	name: 'new-task',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewTask'});
	}
});

FlowRouter.route('/edit-task/:id', {
	name: 'edit-task',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'EditPartial'});
	}
});

FlowRouter.route('/view-task/:id', {
	name: 'view-task',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'TaskSingle'});
	}
});


/** Tools **/
FlowRouter.route('/tool-collection', {
	name: 'tool-collection',
	action(){
		//GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'Tools'});
	}
});

FlowRouter.route('/new-tool', {
	name: 'new-tool',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewTool'});
	}
});

FlowRouter.route('/edit-tool/:id', {
	name: 'edit-tool',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'EditPartial'});
	}
});

FlowRouter.route('/view-tool/:id', {
	name: 'view-tool',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'ToolSingle'});
	}
});


/** Creation of partials **/
FlowRouter.route('/new-categoryType', {
	name: 'new-categoryType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewCategoryType'});
	}
});

FlowRouter.route('/edit-categoryType/:id', {
	name: 'edit-categoryType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'EditPartial'});
	}
});

FlowRouter.route('/view-categoryType/:id', {
	name: 'view-categoryType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'CategoryTypeSingle'});
	}
});

/** Data Types **/
FlowRouter.route('/new-dataType', {
	name: 'new-dataType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewDataType'});
	}
});

FlowRouter.route('/edit-dataType/:id', {
	name: 'edit-dataType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'EditPartial'});
	}
});

FlowRouter.route('/view-dataType/:id', {
	name: 'view-dataType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'DataTypeSingle'});
	}
});

/** Ethical Problems **/
FlowRouter.route('/new-ethicalProblem', {
	name: 'new-ethicalProblem',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewEthicalProblem'});
	}
});

FlowRouter.route('/edit-ethicalProblem/:id', {
	name: 'edit-ethicalProblem',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'EditPartial'});
	}
});

FlowRouter.route('/view-ethicalProblem/:id', {
	name: 'view-ethicalProblem',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'EthicalProblemSingle'});
	}
});

/** Practical Problems **/
FlowRouter.route('/new-practicalProblem', {
	name: 'new-practicalProblem',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewPracticalProblem'});
	}
});

FlowRouter.route('/edit-practicalProblem/:id', {
	name: 'edit-practicalProblem',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'EditPartial'});
	}
});

FlowRouter.route('/view-practicalProblem/:id', {
	name: 'view-practicalProblem',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'PracticalProblemSingle'});
	}
});

/** Super Types **/
FlowRouter.route('/new-superType', {
	name: 'new-superType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewSuperType'});
	}
});

FlowRouter.route('/edit-superType/:id', {
	name: 'edit-superType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'EditPartial'});
	}
});

FlowRouter.route('/view-superType/:id', {
	name: 'view-superType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'SuperTypeSingle'});
	}
});

