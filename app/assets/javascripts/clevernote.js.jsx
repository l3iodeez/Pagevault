$(document).on('ready', function () {
  var Router = ReactRouter.Router;
  var Route =  ReactRouter.Route;
  var IndexRoute = ReactRouter.IndexRoute;
  var root = document.getElementById('content');
  var App = React.createClass({
    render: function () {
      return(
        <div>
          <section className="header-nav">
            <ul>
              <li className="logo">BenchBnB </li>
            </ul>
          </section>
          {this.props.children}
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
