var NotebooksIndex = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {notebooks: NotebookStore.all(), displayNewNoteForm: false, newNotebookTitle: "", newNotebookDescription: ""};
  },
  notebooksChanged: function () {
    this.setState({notebooks: NotebookStore.all()});
  },
  newNotebook: function () {
    this.setState({displayNewNoteForm: true});
  },
  createNotebook: function (e) {
      debugger
    e.preventDefault();
    if (this.state.newNotebookTitle.length > 0) {
      NotebooksAPIUtil.createNotebook({title: this.state.newNotebookTitle, description: this.state.newNotebookDescription});
    }
    this.setState({displayNewNoteForm: false});
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
      var newNoteForm;
    if (this.state.displayNewNoteForm) {
      newNoteForm = (
        <div className="new-notebook-form modal">
          <div>
            <form onSubmit={this.createNotebook}>
              <label htmlFor="notebookTitle">Notebook title:</label>
              <input type="text" name="notebookTitle" valueLink={this.linkState('newNotebookTitle')} />
              <label htmlFor="notebookTitle">Notebook description:</label>
              <input type="text" name="notebookTitle" valueLink={this.linkState('newNotebookDescription')} />

              <button>Create notebook</button>
            </form>
          </div>
        </div>
      );
    }
    return (
      <ul className={indexClass}>
        {newNoteForm}
        <li className="notebook-index-header">
          <p>NOTEBOOKS</p>
          <p>{notebookCount}</p>
          <a className="new-notebook" onClick={this.newNotebook}>New Notebook</a>
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
