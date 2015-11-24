var NotebooksIndexItem = React.createClass({
  getInitialState: function () {
    return {confirming: false};
  },
  handleClick: function (e) {
    e.preventDefault();
    SelectedActions.setSelectedNotebook(this.props.notebook);
    this.props.toggleNotebookIndex();
  },
  showConfirm: function (e) {
    e.preventDefault();
    e.stopPropagation();
    ModalActions.raiseModal({type: "deleteNotebook", object: this.props.notebook});
  },
  render: function() {
    var modifiedDate = Helpers.formatDate(new Date(this.props.notebook.updated_at));
    return (
      <ul className="notebook-index-item" onClick={!this.state.confirming ? this.handleClick : null}>
        <li>{this.props.notebook.title}</li>
        <li>{modifiedDate}</li>
        <li>{this.props.notebook.description}</li>
        <button onClick={this.showConfirm} className="delete-notebook"></button>
        <img src="http://placehold.it/96x96" />
      </ul>
    );
  }
});
