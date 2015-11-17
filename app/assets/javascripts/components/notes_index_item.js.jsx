var NotesIndexItem = React.createClass({
  handleClick: function (e) {
    this.props.clickCallback(this.props.note);
  },
  render: function() {
    return (
      <ul className="note-index-item" onClick={this.handleClick}>
        <li>{this.props.note.title}</li>
      </ul>
    );
  }
});
