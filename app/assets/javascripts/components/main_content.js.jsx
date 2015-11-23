var MainContainer = React.createClass({
  getInitialState: function () {
    return { selectedNote: NoteStore.getFirst(), showIndex: this.props.showIndex };
  },
  selectedChange: function () {
    if (SelectedStore.getNote() && SelectedStore.getNote().id) {
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
    SelectedStore.addNoteChangeListener(this.selectedChange);
    // NoteStore.addChangeListener(this.selectedChange);
  },
  componentWillUnmount: function () {
    SelectedStore.removeNoteChangeListener(this.selectedChange);
    // NoteStore.addChangeListener(this.selectedChange);

  },
  render: function() {
    return (
      <div className="notes">
        <NotesIndex show={this.props.showIndex}/>
        <NoteForm
          fullWidth={!this.props.showIndex}
          toggleIndex={this.props.toggleIndex} />
      </div>
    );
  }
});
