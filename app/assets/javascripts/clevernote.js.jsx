$(document).on('ready', function () {
  var Router = ReactRouter.Router;
  var Route =  ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var root = document.getElementById('root');
  var App = React.createClass({
    render: function () {
      return(
        <div>

                <h1>Clevernote</h1>

            <NotesIndex />
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
