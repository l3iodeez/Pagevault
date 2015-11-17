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
    ApiUtil.fetchNotes();
  },
  componentWillUnmount: function () {
    NoteStore.removeChangeListener(this.notesChanged);
  },
  render: function () {
    return(
      <ul>
      { typeof this.state.notes === "undefined" ? null :
        this.state.notes.map(function (note) {
          return (
            <ul>
              <li>{note.title}</li>
              <li>{note.body}</li>
              <li>{note.is_archived}</li>
            </ul>
          );
        })
      }
      </ul>
    );
  }
});
