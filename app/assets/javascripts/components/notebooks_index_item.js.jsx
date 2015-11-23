var NotebooksIndexItem = React.createClass({
  handleClick: function (e) {
    e.preventDefault();
    SelectedActions.setSelectedNotebook(this.props.notebook);
    this.props.toggleNotebookIndex();
  },
  render: function() {
    var modifiedDate = Helpers.formatDate(new Date(this.props.notebook.updated_at));
    return (
      <ul className="notebook-index-item" onClick={this.handleClick}>
        <li>{this.props.notebook.title}</li>
        <li>{modifiedDate}</li>
        <li>{this.props.notebook.description}</li>
        <img src="http://placehold.it/96x96" />
      </ul>
    );
  }
});
