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
    ApiUtil.fetchAllNotes();
  },
  componentWillUnmount: function () {
    NoteStore.removeChangeListener(this.notesChanged);
  },
  render: function () {
    var indexClass = "note-index";
    if (!this.props.show) {
      indexClass +=" hidden";
    }
    return(
      <ul className={indexClass}>
      { typeof this.state.notes === "undefined" ? null :
        this.state.notes.map(function (note) {
          return (
            <NotesIndexItem key={note.id} note={note} />
          );
        }.bind(this))
      }
      </ul>
    );
  }
});
