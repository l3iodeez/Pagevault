var MainContainer = React.createClass({
  getInitialState: function () {
    return { selectedNote: NoteStore.getFirst(), showIndex: this.props.showIndex };
  },
  selectedChange: function () {
  
    if (SelectedStore.getNote()) {
      this.setState({ selectedNote: SelectedStore.getNote() });
    } else {
      this.setState({ selectedNote: NoteStore.getFirst() });
    }

  },
  componentWillReceiveProps: function (newProps) {
    if (!newProps.showIndex) {
      this.setState({ selectedNote: null });
    }
  },
  componentDidMount: function () {
    SelectedStore.addChangeListener(this.selectedChange);
    NoteStore.addChangeListener(this.selectedChange);
  },
  componentWillUnmount: function () {
    SelectedStore.removeChangeListener(this.selectedChange);
    NoteStore.addChangeListener(this.notesChange);

  },
  render: function() {
    return (
      <div className="notes">
        <NotesIndex show={this.props.showIndex}/>
        <NoteForm
          note={this.state.selectedNote}
          fullWidth={!this.props.showIndex}
          toggleIndex={this.props.toggleIndex} />
      </div>
    );
  }
});
