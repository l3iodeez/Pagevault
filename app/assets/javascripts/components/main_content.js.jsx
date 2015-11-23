var MainContainer = React.createClass({
  getInitialState: function () {
    return {
      selectedNote: NoteStore.getFirst(),
      showNoteIndex: this.props.showNoteIndex,
      showNotebookIndex: this.props.showNotebookIndex
     };
  },
  selectedChange: function () {
    if (SelectedStore.getNote() && SelectedStore.getNote().id) {
      this.setState({ selectedNote: SelectedStore.getNote() });
    } else {
      this.setState({ selectedNote: NoteStore.getFirst() });
    }

  },
  componentWillReceiveProps: function (newProps) {
    if (!newProps.showNoteIndex) {
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
        <NotesIndex show={this.props.showNoteIndex} />
        <NotebooksIndex
          show={this.props.showNotebookIndex}
          toggleNotebookIndex={this.props.toggleNotebookIndex} />
        <NoteForm
          fullWidth={!this.props.showNoteIndex}
          toggleNoteIndex={this.props.toggleNoteIndex} />
      </div>
    );
  }
});
