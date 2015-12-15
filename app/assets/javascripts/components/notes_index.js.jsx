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
  selectedNoteChanged: function () {
    this.forceUpdate();
  },
  selectedNotebookChanged : function () {
    var selectedNotebook = SelectedStore.getNotebook();
    if (selectedNotebook) {
      this.setState({notebook: SelectedStore.getNotebook(), notes: NoteStore.getByNotebookID(SelectedStore.getNotebook().id) });
    }
  },
  notebooksChanged: function () {
    if (this.state.notebook) {
      return;
    }
    var recentNote = NoteStore.getByID(CurrentUserStore.currentUser().recent_note_id);
    var recentNotebook = NotebookStore.getByID(recentNote.notebook_id);
    SelectedStore.setNotebook(recentNotebook);
  },
  componentDidMount: function () {
    NoteStore.addChangeListener(this.notesChanged);
    NotebookStore.addChangeListener(this.notebooksChanged);
    SelectedStore.addNoteChangeListener(this.selectedNoteChanged);

    SelectedStore.addNotebookChangeListener(this.selectedNotebookChanged);
    NotesAPIUtil.fetchAllNotes(NotebooksAPIUtil.fetchAllNotebooks);
  },
  componentWillUnmount: function () {
    NoteStore.removeChangeListener(this.notesChanged);
    SelectedStore.removeNotebookChangeListener(this.selectedNotebookChanged);
    SelectedStore.removeNoteChangeListener(this.selectedNoteChanged);
    NotebookStore.removeChangeListener(this.notebooksChanged);
  },
  render: function () {
    var indexClass = "left-pane sliding-pane note-index";
    if (!this.props.show) {
      indexClass +=" hidden";
    }
    var noteCount;
    if (this.state.notes.length === 1) {
      noteCount = "1 note";
    } else {
      noteCount = this.state.notes.length + " notes";
    }

    var notebooklabel = this.state.notebook ? <p className="notebook-label">Notebook:{this.state.notebook.title}</p> : null ;
    return(
      <ul className={indexClass}>
        <li className="note-index-header">
          <p>NOTES</p>
          {notebooklabel}
          <p>{noteCount}</p>
        </li>
        <div className="note-index index-item-container">
          { typeof this.state.notes === "undefined" ? null :
            this.state.notes.map(function (note, i) {
              return (
                <NotesIndexItem key={i} note={note} />
              );
            }.bind(this))
          }
        </div>
      </ul>
    );
  }
});
