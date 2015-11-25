var Search = React.createClass({
  getInitialState: function() {
    return {searchString: "", results: []};
  },

  updateResults: function () {

  },
  setTimeout: function () {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(function () {
      this.updateResults(null, function () {
        this.setState({results: "saved"});
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

        </div>
      </ul>
    );
  }
});
