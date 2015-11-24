var NoteFormHeader = React.createClass({
  getInitialState: function () {
    return {confirming: false, notification: ""};
  },
  showConfirm: function () {
    if (this.props.note) {
      this.setState({confirming: true});
    }
  },
  hideConfirm: function () {
    this.setState({confirming: false});
  },
  deleteNote: function () {
    if (this.props.note) {
      NotesAPIUtil.destroyNote(this.props.note, function (data) {
        SelectedActions.setSelectedNote(NoteStore.getFirst(SelectedStore.getNotebook().id));
      });
    }
    else {
      SelectedActions.setSelectedNote(NoteStore.getFirst(SelectedStore.getNotebook().id));
    }
    this.hideConfirm();
  },
  render: function() {
    var modal;
    if (this.state.confirming) {
      modal = (
        <div className="modal confirm-delete">
          <div>
            <p>Delete this note?</p>
            <button onClick={this.deleteNote}>Yes</button>
            <button onClick={this.hideConfirm}>No</button>
          </div>
        </div>
      );
    }
    return (
      <div className={this.props.containerClass + " header"}>
        { modal}
        <div className="header-delete icon" onClick={this.showConfirm}>

        </div>
      </div>
    );
  }
});
