var NotesIndexItem = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    SelectedActions.setSelectedNote(this.props.note);
  },
  render: function() {
    var selected = "";
    if (SelectedStore.getNote() && this.props.note.id === SelectedStore.getNote().id) {
      selected = " selected";
    }
    var modifiedDate = Helpers.formatDate(new Date(this.props.note.updated_at));
    var indexThumbnail = this.props.note.thumbnail ? (<img src={this.props.note.thumbnail} />) : null;
    return (
      <ul className={"note-index-item" + selected} onClick={this.handleClick}>
        <li>{this.props.note.title}</li>
        <li>{modifiedDate}</li>
        <li>{this.props.note.is_encrypted ? "NOTE BODY ENCRYPTED" : $("<div>" + this.props.note.body + "</div>").text()}</li>
        {indexThumbnail}

      </ul>
    );
  }
});
