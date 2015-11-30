$(document).on('ready', function () {
  var Router = ReactRouter.Router;
  var Route =  ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var root = document.getElementById('root');

  var App = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function () {
      return {
        selectedNote: null,
        showNoteIndex: true,
        currentUser: null,
        showNotebookIndex: false,
        showSearch: false,
      };
    },
    toggleNoteIndex: function (select) {
      if (this.state.showNoteIndex) {

      }
      this.setState({
        showNoteIndex: !this.state.showNoteIndex,
        showNotebookIndex: false,
        showSearch: false
      });
      if (!this.state.showNoteIndex && select) {
        SelectedActions.setSelectedNote(SelectedStore.getNotebook().firstNote);
      }
    },
    toggleNotebookIndex: function () {
      this.setState({showNotebookIndex: !this.state.showNotebookIndex});
    },
    toggleSearch: function () {
      this.setState({showSearch: !this.state.showSearch});

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
        this.history.pushState(null, "/");
      } else {
        this.setState({currentUser: CurrentUserStore.currentUser()});
      }

    },
    render: function () {
      var mainViewClass = "main-view";
      if (!this.state.showNoteIndex) {
        mainViewClass += " fullscreen";
      }
      return(
        <div className="app-container group">
          <Modals />
          <Sidebar
            showNoteIndex={this.state.showNoteIndex}
            toggleNoteIndex={this.toggleNoteIndex}
            showNotebookIndex={this.state.showNotebookIndex}
            toggleNotebookIndex={this.toggleNotebookIndex}
            showSearch={this.state.showSearch}
            toggleSearch={this.toggleSearch} />
          <div className={mainViewClass}>
            <MainContainer
              showNoteIndex={this.state.showNoteIndex}
              toggleNoteIndex={this.toggleNoteIndex}
              showNotebookIndex={this.state.showNotebookIndex}
              toggleNotebookIndex={this.toggleNotebookIndex}
              showSearch={this.state.showSearch}
              toggleSearch={this.toggleSearch} />
          </div>
        </div>
      );
    }

  });
  var router = (
    <Router>
      <Route path="/" component={SessionForm}>
      </Route>
      <Route path="/register" component={RegistrationForm}>
      </Route>
      <Route path="/p" component={App}>
      </Route>
    </Router>
  );
  ReactDOM.render(router, root);
});
