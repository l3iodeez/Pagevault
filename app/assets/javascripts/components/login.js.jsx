(function(root) {
  root.SessionForm = React.createClass({
    mixins: [ReactRouter.History],

    componentWillMount: function () {
      if (CurrentUserStore.isLoggedIn()) {
        this.history.pushState(null, "/");
      }
    },

    submit: function (e) {
      e.preventDefault();

      var credentials = $(e.currentTarget).serializeJSON();
      SessionsApiUtil.login(credentials, function () {
        this.history.pushState(null, "/");
      }.bind(this));
    },



    render: function() {

      return (
        <form onSubmit={ this.submit }>

          <h1>Log In!</h1>

          <label>
            Email
            <input type="text" name="user[email]" />
          </label>

          <label>
            Password
            <input type="text" name="user[password]" />
          </label>

          <button>Log In!</button>
        </form>
      );
    },

  });
})(this);
