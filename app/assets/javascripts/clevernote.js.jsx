$(document).on('ready', function () {
  var Router = ReactRouter.Router;
  var Route =  ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var root = document.getElementById('root');

  var App = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return { selectedNote: null, showIndex: true, currentUser: null  };
    },
    toggleIndex: function () {
      this.setState({showIndex: !this.state.showIndex});
      if (!this.state.showIndex) {
        SelectedActions.setSelected(NoteStore.getFirst());
      }
    },
    setSelected: function (note) {
      this.setState({selectedNote: note});
    },


    componentWillMount: function () {
      CurrentUserStore.addChangeHandler(this._ensureLoggedIn);
      SessionsApiUtil.fetchCurrentUser();
    },

    _ensureLoggedIn: function () {
      if (!CurrentUserStore.isLoggedIn()) {
        this.history.pushState(null, "/login");
      }
      this.setState({currentUser: CurrentUserStore.currentUser()});

    },
    render: function () {
      var mainViewClass = "main-view";
      if (!this.state.showIndex) {
        mainViewClass += " fullscreen";
      }
      return(
        <div className="app-container group">
          <Sidebar showIndex={this.state.showIndex} toggleIndex={this.toggleIndex} />
          <div className={mainViewClass}>
            <MainContainer showIndex={this.state.showIndex} toggleIndex={this.toggleIndex} />
          </div>
        </div>
      );
    }

  });
  var router = (
    <Router>
      <Route path="/login" component={SessionForm}>
      </Route>
      <Route path="/" component={App}>
      </Route>
    </Router>
  );
  React.render(router, root);
});
