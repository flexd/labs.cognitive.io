var App = require('app');

App.RepositoriesController = Em.ArrayController.extend({
  content: [],
  isLoaded: false,
  limit: false,
  user: 'flexd',
  loadSuccess: function(data) {
    var meta = data.meta;
    if (meta["X-RateLimit-Remaining"] == 0) {
      this.set('limit', true);
    }
    var repos = data.data;
    repos.forEach(function(repo){
      var r = App.RepositoryModel.create({
              name: repo.full_name,
              description: repo.description,
              url: repo.clone_url,
              watchers: repo.watchers_count,
              forks: repo.forks_count
      });

      this.pushObject(r);
//            console.log("Added a repo called " + r.get('name') + " to the array");
    }, this);
  },
  loadComplete: function(xhr) {
    this.set('isLoaded', true);
  },
  loadRepos: function () {

    if (this.get('user')) {
      var url = 'https://api.github.com/users/%@/repos?callback=?'.fmt(encodeURIComponent(this.get('user')));
      $.ajax({
        url: url,
        dataType: 'JSON',
        context: this,
        success: this.loadSuccess,
        complete: this.loadComplete
      });
    }
  }
});
