var App = require('app');

App.RepositoriesView = Em.View.extend({
  //templateName: require('templates/home')
  loaderBinding: 'App.RepositoriesController.loader',
  firstRunBinding: 'App.RepositoriesController.firstRun',
  limitBinding: 'App.RepositoriesController.limit',
  templateName: require('templates/repositories')
});
