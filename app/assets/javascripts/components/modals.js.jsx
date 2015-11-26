var Modals = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {modal: null, editId: null, newNotebookTitle: "", newNotebookDescription: "", pending: false};
  },
  componentWillMount: function() {
    ModalStore.addChangeListener(this.raiseModal);
  },
  componentWillUnmount: function() {
    ModalStore.removeChangeListener(this.raiseModal);
  },
  raiseModal: function () {
    var modalInfo = ModalStore.currentModal();
    if (modalInfo.type === "deleteNote") {
      this.setState({modal: this.deleteNoteModal(), editId: modalInfo.object.id});
    }
    else if (modalInfo.type === "deleteNotebook") {
      this.setState({modal: this.deleteNotebookModal(), editId: modalInfo.object.id});
    }
    else if (modalInfo.type === "newNotebook") {
      this.setState({modal: this.newNotebookModal(), editId: null});
    } else {
      this.setState({modal: null, editId: null});
    }
  },
  spinner: function () {
    return (
      <div className="modal spinner">
        <i className="modal-spinner-image fa fa-spinner fa-spin " />
      </div>
    );
  },
  closeModal: function () {
    ModalActions.closeModal();
    SelectedStore.setNote(NoteStore.getFirst(SelectedStore.getNotebook().id));
  },
  deleteNoteModal: function () {
    return (
      <div className="modal confirm-delete">
        <div>
          <p>Delete this note?</p>
          <button onClick={this.deleteNote}>Yes</button>
          <button onClick={this.closeModal}>No</button>
        </div>
      </div>
    );
  },
  deleteNote: function (e) {
    e.preventDefault();
    NotesAPIUtil.destroyNote({id: this.state.editId}, this.closeModal);
  },
  deleteNotebookModal: function () {
    return (
      <div className="modal confirm-delete">
        <div>
          <p>Delete this notebook?</p>
          <button onClick={this.deleteNotebook}>Yes</button>
          <button onClick={this.closeModal}>No</button>
        </div>
      </div>
    );
  },
  deleteNotebook: function (e) {
    e.preventDefault();
    NotebooksAPIUtil.destroyNotebook({id: this.state.editId}, this.closeModal);
  },
  newNotebookModal: function () {
    return(
      <div className="modal new-notebook-form">
        <div>
          <form onSubmit={this.newNotebook}>
            <label htmlFor="notebookTitle">Notebook title:</label>
            <input type="text" name="notebookTitle" onChange={this.titleChanged} />
            <label htmlFor="notebookDescription">Notebook description:</label>
            <input type="text" name="notebookDescription"  onChange={this.descriptionChanged}/>
            <button>Create notebook</button>
            <button onClick={this.closeModal}>Cancel</button>
          </form>
        </div>
      </div>
    );
  },
  newNotebook: function (e) {
    e.preventDefault();
    this.setState({pending: true, modal: this.spinner() });
    var notebook = {
      title: this.state.newNotebookTitle,
      description: this.state.newNotebookDescription
    };
    NotebooksAPIUtil.createNotebook(notebook, this.closeModal, function () {
      this.setState({modal: this.newNotebookModal(), editId: null });
    });
  },
  titleChanged: function (e) {
    this.setState({newNotebookTitle: e.currentTarget.value});
  },
  descriptionChanged: function (e) {
    this.setState({newNotebookDescription: e.currentTarget.value});
  },
  render: function() {
    var modalClass;
    if (this.state.modal) {
      modalClass = "modal-bg";
    }
    return (
      <div className={modalClass}>
        {this.state.modal}
      </div>

    );
  }
});
