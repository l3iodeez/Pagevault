(function(root) {
  root.RegistrationForm = React.createClass({
    mixins: [ReactRouter.History, React.addons.LinkedStateMixin],

    getInitialState: function () {
      return({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
        errorMessages: ""
      });
    },

    componentWillMount: function () {
      if (CurrentUserStore.isLoggedIn()) {
        this.history.pushState(null, "/");
      }
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
      UsersApiUtil.createUser(credentials, redirectToMain, showErrors);
    },

    passwordConfirmMistmatch: function () {
       return ((this.state.password.length > 0 && this.state.confirmPassword.length > 0 )&&
         this.state.password !== this.state.confirmPassword);
    },


    passwordConfirmMessage: function () {
      if (this.passwordConfirmMistmatch()) {
        return (
            <p>Password does not match confirmation.</p>
        );
        }
    },
    validationErrors: function () {
      if (this.state.errorMessages.length > 0) {
        return(
          <span>
          {
            this.state.errorMessages.map(function (message) {
              return(<p>{message}</p>);
            }.bind(this))
          }
        </span>
        );
      }
    },
    displayErrors: function () {
        return(<span className="error-text">
                {this.passwordConfirmMessage()}
                {this.validationErrors()}
              </span>);
    },




    render: function() {

      return (
        <div className="modal loginform group">
          <div>
            <form onSubmit={ this.submit }>

              <h1>Register</h1>

              <label>
                Email
                <br></br>
                <input type="text" name="user[email]" valueLink={this.linkState('email')}/>
              </label>
              <br></br>

              <label>
                Name
                <br></br>
                <input type="text" name="user[name]" valueLink={this.linkState('name')}/>
              </label>
              <label>
                Password
                <br></br>
                <input type="password" name="user[password]" valueLink={this.linkState('password')} />
              </label>
              <label>
                Confirm Password
                <br></br>
                <input type="password" valueLink={this.linkState('confirmPassword')}/>
              </label>
              {this.displayErrors()}
              <button>Register</button>
                <br></br>
              <a href="#/login">Log In</a>
            </form>
          </div>
        </div>
      );
    },

  });
})(this);
