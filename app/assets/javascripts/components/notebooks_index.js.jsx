var NotebooksIndex = React.createClass({
  getInitialState: function() {
    return {notebooks: NotebookStore.all()};
  },
  notebooksChanged: function () {
    this.setState({notebooks: NotebookStore.all()});
  },
  componentDidMount: function() {
    NotebookStore.addChangeListener(this.notebooksChanged);
  },
  componentWillUnmount: function() {
    NotebookStore.removeChangeListener(this.notebooksChanged);
  },
  render: function() {
    var indexClass = "notebook-index";
    if (!this.props.show) {
      indexClass +=" hidden";
    }
    var notebookCount;
    if (this.state.notebooks.length === 1) {
      notebookCount = "1 notebook";
    } else {
      notebookCount = this.state.notebooks.length + " notebooks";
    }
    return (
      <ul className={indexClass}>
        <li className="notebook-index-header">
          <p>NOTEBOOKS</p>
          <p>{notebookCount}</p>
        </li>
        <div className="notebook-index-container">
          { typeof this.state.notebooks === "undefined" ? null :
            this.state.notebooks.map(function (notebook) {
              return (
                <NotebooksIndexItem
                  key={notebook.id}
                  notebook={notebook}
                  toggleNotebookIndex={this.props.toggleNotebookIndex} />
              );
            }.bind(this))
          }
        </div>
      </ul>
    );
  }
});
