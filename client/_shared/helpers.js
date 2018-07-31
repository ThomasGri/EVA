/**
*
*	Global Helpers
*
**/

// Redirect on cancel Button.
Template.MainLayout.events({
  'click .cancel': function(event, template) {
    history.back()
  }
});

// Add https:// to links which don't have a protocol given.
Template.registerHelper("addHttp", function (url) {
  if (!/^(f|ht)tps?:\/\//i.test (url)) {
    url = "https://" + url;
  }
  return url;
});
