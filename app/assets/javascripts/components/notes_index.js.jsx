var NotesIndex = React.createClass({
  getInitialState: function () {
    return({
      notes: [],
      notebook: null
    });
  },
  notesChanged: function () {
    if (!this.state.notebook) {
      return;
    }
    this.setState({ notes: NoteStore.getByNotebookID(this.state.notebook.id) });
  },
  selectedNotebookChanged : function () {
    var selectedNotebook = SelectedStore.getNotebook();
    if (selectedNotebook) {
      this.setState({notebook: SelectedStore.getNotebook()});
      this.notesChanged();
    }
  },
  notebooksChanged: function () {
    if (this.state.notebook) {
      return;
    }
    SelectedStore.setNotebook(NotebookStore.getFirst());
  },
  componentDidMount: function () {
    NoteStore.addChangeListener(this.notesChanged);
    NotebookStore.addChangeListener(this.notebooksChanged);

    SelectedStore.addNotebookChangeListener(this.selectedNotebookChanged);
    NotesAPIUtil.fetchAllNotes(NotebooksAPIUtil.fetchAllNotebooks);
  },
  componentWillUnmount: function () {
    NoteStore.removeChangeListener(this.notesChanged);
    SelectedStore.removeNotebookChangeListener(this.selectedNotebookChanged);
    NotebookStore.removeChangeListener(this.notebooksChanged);
  },
  render: function () {
    var indexClass = "note-index";
    if (!this.props.show) {
      indexClass +=" hidden";
    }
    var noteCount;
    if (this.state.notes.length === 1) {
      noteCount = "1 note";
    } else {
      noteCount = this.state.notes.length + " notes";
    }

    return(
      <ul className={indexClass}>
        <li className="note-index-header">
          <p>NOTES</p>
          <p>{noteCount}</p>
        </li>
        <div className="note-index-container">
          { typeof this.state.notes === "undefined" ? null :
            this.state.notes.map(function (note) {
              return (
                <NotesIndexItem key={note.id} note={note} />
              );
            }.bind(this))
          }
        </div>
      </ul>
    );
  }
});
