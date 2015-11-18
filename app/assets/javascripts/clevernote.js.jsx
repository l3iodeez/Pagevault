$(document).on('ready', function () {
  var Router = ReactRouter.Router;
  var Route =  ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var root = document.getElementById('root');

  var App = React.createClass({
    getInitialState: function () {
      return { selectedNote: null, showIndex: true };
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
      <Route path="/" component={App}>
      </Route>
    </Router>
  );
  React.render(router, root);
});
