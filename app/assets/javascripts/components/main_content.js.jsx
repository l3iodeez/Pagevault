var MainContainer = React.createClass({
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
        <Search
          toggleSearch={this.props.toggleSearch}
          show={this.props.showSearch}
          />
      </div>
    );
  }
});
