
/** Login Sutff **/
if(Meteor.isClient){
	// redirect upon login
	Accounts.onLogin(function(){
		FlowRouter.go('my-studies');
	});

	// redirect upon logout
	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}

// redirect if user is not logged in
FlowRouter.triggers.enter([function(context, redirect){
	if(!Meteor.userId()){
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

FlowRouter.route('/new-study/:step?', {
  name: 'new-study',
  action() {
    //if (!FlowRouter.current().queryParams.step) {
    	BlazeLayout.render('MainLayout', {main: 'NewStudy'});
    //} else {
     // BlazeLayout.render('MainLayout', {main: 'NewStudy',
     // 	step: this.params.step});
    //}
  }
});

FlowRouter.route('/study/:id', {
	name: 'study-details',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'StudySingle'});
	}
});

FlowRouter.route('/edit-study/:id', {
	name: 'edit-study',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'StudyAllWizards'});
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

FlowRouter.route('/view-method/:id', {
	name: 'method-details',
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


/** Creation of partials **/
FlowRouter.route('/new-ethicalProblem', {
	name: 'new-ethicalProblem',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewEthicalProblem'});
	}
});

FlowRouter.route('/new-categoryType', {
	name: 'new-categoryType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewCategoryType'});
	}
});

FlowRouter.route('/new-dataType', {
	name: 'new-dataType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewDataType'});
	}
});

FlowRouter.route('/new-interpretation', {
	name: 'new-interpretation',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewInterpretation'});
	}
});

FlowRouter.route('/new-practicalProblem', {
	name: 'new-practicalProblem',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewPracticalProblem'});
	}
});

FlowRouter.route('/new-presentation', {
	name: 'new-presentation',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewPresentation'});
	}
});

FlowRouter.route('/new-superType', {
	name: 'new-superType',
	action(){
	//	GAnalytics.pageview();
		BlazeLayout.render('MainLayout', {main: 'NewSuperType'});
	}
});

