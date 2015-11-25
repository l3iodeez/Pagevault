var Search = React.createClass({
  getInitialState: function() {
    return {searchString: "", results: []};
  },

  setTimeout: function () {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(function () {
      SearchAPIUtil.search(this.state.searchString, function (data) {
        this.setState({results: data });
      }.bind(this));
    }.bind(this), 2000);
  },
  render: function() {
    var indexClass = "left-pane sliding-pane search ";
    if (!this.props.show) {
      indexClass +=" hidden";
    }
    return (
      <ul className={indexClass}>
        <li className="search-header">
          <p>SEARCH NOTES</p>
          <input className="search-input" type="text"></input>
        </li>
        <div onChange={this.setTimeout} className="search-results-container">
          {this.state.results.map(function (note) {
            return (
              <NotesIndexItem key={note.id} note={note} />
              );
          })}
        </div>
      </ul>
    );
  }
});
