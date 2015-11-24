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

    this.setState({confirming: true});
  },
  hideConfirm: function () {
    this.setState({confirming: false});
  },
  deleteNotebook: function () {
    debugger
    NotebooksAPIUtil.destroyNotebook(this.props.notebook, function (data) {
      if (this.props.notebook.id === SelectedStore.getNotebook().id) {
        SelectedActions.setSelectedNotebook(NotebookStore.getFirst());
      }
    }.bind(this));
    this.hideConfirm();
  },
  render: function() {
    var modal;
    if (this.state.confirming) {
      modal = (
        <div className="modal confirm-delete">
          <div>
            <p>Delete this notebook?</p>
            <button onClick={this.deleteNotebook}>Yes</button>
            <button onClick={this.hideConfirm}>No</button>
          </div>
        </div>
      );
    }
    var modifiedDate = Helpers.formatDate(new Date(this.props.notebook.updated_at));
    return (
      <ul className="notebook-index-item" onClick={!this.state.confirming ? this.handleClick : null}>
        <li>{this.props.notebook.title}</li>
        <li>{modifiedDate}</li>
        <li>{this.props.notebook.description}</li>
        <button onClick={this.showConfirm} className="delete-notebook"></button>
        <img src="http://placehold.it/96x96" />
        {modal}
      </ul>
    );
  }
});
