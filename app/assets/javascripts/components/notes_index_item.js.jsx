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
    var indexThumbnail;
    if (this.props.note) {
      var thumbnailClass = "";
      var thumbnailLink = this.props.note.thumbnail;
      if ( thumbnailLink ) {
        if (this.props.note.portrait) {
          thumbnailClass += "portrait";
        }
        indexThumbnail = (
          <div className="thumbnail" >
            <img className={thumbnailClass} src={thumbnailLink} />
          </div>
        );
      }
    }
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
