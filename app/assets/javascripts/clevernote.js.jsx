$(document).on('ready', function () {
  var Router = ReactRouter.Router;
  var Route =  ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var root = document.getElementById('root');

  var App = React.createClass({
    getInitialState: function () {
      return { selectedNote: null };
    },
    setSelected: function (note) {
      this.setState({selectedNote: note});
    },
    render: function () {
      return(
        <div>
          <h1>Clevernote</h1>
          <div className="notes">
            <NotesIndex setSelected={this.setSelected} />
            <NoteForm note={this.state.selectedNote} setSelected={this.setSelected} />
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
