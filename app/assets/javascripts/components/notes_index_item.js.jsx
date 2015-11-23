var NotesIndexItem = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    SelectedActions.setSelectedNote(this.props.note);
  },
  render: function() {
    var modifiedDate = Helpers.formatDate(new Date(this.props.note.updated_at));
    return (
      <ul className="note-index-item" onClick={this.handleClick}>
        <li>{this.props.note.title}</li>
        <li>{modifiedDate}</li>
        <li>{this.props.note.body}</li>
        <img src="http://placehold.it/96x96" />
      </ul>
    );
  }
});
