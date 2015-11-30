var NotesIndexItem = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    SelectedActions.setSelectedNote(this.props.note);
  },
  render: function() {
    var modifiedDate = Helpers.formatDate(new Date(this.props.note.updated_at));
    var indexThumbnail = this.props.note.thumbnail ? (<img src={this.props.note.thumbnail} />) : null;
    return (
      <ul className="note-index-item" onClick={this.handleClick}>
        <li>{this.props.note.title}</li>
        <li>{modifiedDate}</li>
        <li>{$("<div>" + this.props.note.body + "</div>").text()}</li>
        {indexThumbnail}

      </ul>
    );
  }
});
