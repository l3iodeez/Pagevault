var Search = React.createClass({

  getInitialState: function() {
    return {searchString: "", results: [], status: "idle"};
  },

  setTimeout: function () {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(function () {
      this.setState({status: "searching"});
      SearchAPIUtil.search(this.state.searchString, function (data) {
        this.setState({results: data, status: "idle" });
      }.bind(this));
    }.bind(this), 300);
  },
  searchChanged: function (e) {
    this.setTimeout();
    this.setState({searchString: e.currentTarget.value});
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
          <input onChange={this.searchChanged} className="search-input" type="text" ></input>
          {this.state.status === "searching" ? <div className="tiny-spinner fa fa-spinner fa-spin"></div> : null}
        </li>
        <div className="search-results index-item-container">
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
