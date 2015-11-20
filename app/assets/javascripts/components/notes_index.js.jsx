var NotesIndex = React.createClass({
  getInitialState: function () {
    return({
      notes: NoteStore.all()
    });
  },
  notesChanged: function () {
    this.setState({ notes: NoteStore.all() });
  },
  componentDidMount: function () {
    NoteStore.addChangeListener(this.notesChanged);
    NotesAPIUtil.fetchAllNotes();
  },
  componentWillUnmount: function () {
    NoteStore.removeChangeListener(this.notesChanged);
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
