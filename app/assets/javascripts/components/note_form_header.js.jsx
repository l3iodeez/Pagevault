var NoteFormHeader = React.createClass({
  getInitialState: function () {
    return {confirming: false, notification: ""};
  },
  showConfirm: function () {
    ModalActions.raiseModal({type: "deleteNote", object: this.props.note});
  },
  render: function() {
    return (
      <div className={this.props.containerClass + " header"}>
        <div className="header-delete icon" onClick={this.showConfirm}>
        </div>
      </div>
    );
  }
});
