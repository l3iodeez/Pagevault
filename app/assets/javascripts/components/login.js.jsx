(function(root) {
  root.SessionForm = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function () {
      return {errorMessages: "" };
    },
    componentWillMount: function () {
      if (CurrentUserStore.isLoggedIn()) {
        this.history.pushState(null, "/");
      }
      UsersApiUtil.fetchUsers(function (users) {
        this.setState({users: users});
      }.bind(this));
    },

    submit: function (e) {
      e.preventDefault();
      var redirectToMain = function () {
        this.history.pushState(null, "/");
      }.bind(this);

      var showErrors = function (data) {
        this.setState({errorMessages: data.responseJSON.errors});
      }.bind(this);

      var credentials = $(e.currentTarget).serializeJSON();

      SessionsApiUtil.login(credentials, redirectToMain, showErrors);
    },
    validationErrors: function () {
      if (this.state.errorMessages.length > 0) {
        return(
          <span className="error-text">
          {
            this.state.errorMessages.map(function (message) {
              return(<p>{message}</p>);
            }.bind(this))
          }
        </span>
        );
      }
    },


    render: function() {
      var demoUsers;
      if (this.state.users) {
        demoUsers = <span>
                      <h4>Demo accounts</h4>
                      {this.state.users.map(function (user) {
                          return <p>{user.email}</p>;
                        }.bind(this))}
                    </span>;
      }
      return (
        <div className="modal loginform group">
          <div>
            <form onSubmit={ this.submit }>

              <h1>Log In</h1>

              <label>
                Email
                <br></br>
                <input type="text" name="user[email]" />
              </label>

              <label>
                Password
                <br></br>
                <input type="password" name="user[password]" />
              </label>
              <br></br>
              {this.validationErrors()}
              <button>Log In</button>
                <br></br>
              <a href="#/register">Register</a>
              <p>Login with a demo account using password 'password'</p>
              {demoUsers}
            </form>
          </div>
        </div>
      );
    },

  });
})(this);
