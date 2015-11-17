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
  handleClick: function (note) {

    this.props.setSelected(note);
  },
  render: function () {
    return(
      <ul className="note-index">
      { typeof this.state.notes === "undefined" ? null :
        this.state.notes.map(function (note) {
          return (
            <NotesIndexItem key={note.id} note={note} clickCallback={this.handleClick}/>
          );
        }.bind(this))
      }
      </ul>
    );
  }
});
