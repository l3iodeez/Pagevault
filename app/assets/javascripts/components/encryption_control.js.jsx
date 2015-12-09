var EncryptionControl = React.createClass({
  getInitialState: function() {
    return {
      password: ''

    };
  },
  enable: function () {
    ModalActions.raiseModal({type: "encryptNote", callback: this.props.enableCrypt });
  },
  disable: function () {
    ModalActions.raiseModal({type: "decryptNote", callback: this.props.disableCrypt });
  },
  decryptNote: function () {
    this.props.decryptNote(this.state.password);
  },
  changePassword: function (e) {
    this.setState({password: e.currentTarget.value}, this.decryptNote);
  },
  render: function() {
    var disabled = (
      <button onClick={this.enable}>Enable <i className="fa fa-lock"/></button>
    );
    var decrypted =(
      <button onClick={this.disable}>Disable <i className="fa fa-lock"/></button>
    );
    var encrypted =(
      <input type="text" onChange={this.changePassword} value={this.state.password}></input>
    );
    return (
      <div className="encryption-options">
        {this.props.enabled ? (this.props.locked ? encrypted : decrypted) : disabled}
      </div>
    );
  }
});
