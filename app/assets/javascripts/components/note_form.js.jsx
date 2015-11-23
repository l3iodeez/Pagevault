var NoteForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {

    var selectedNote = SelectedStore.getNote();
    var id = selectedNote ? selectedNote.id : "";
    var title = selectedNote ? selectedNote.title : "";
    var body = selectedNote ? selectedNote.body : "";
    var is_archived  = selectedNote ? selectedNote.is_archived : "";

    return {
      id: id,
      title: title,
      body: body,
      is_archived: is_archived,
      saving: "saved"
    };
  },
  importID: function () {
    this.setState({ id: SelectedStore.getNote().id });
  },
  changeSelectedNote: function () {
    this.setState($.extend({saving: "saved"}, SelectedStore.getNote() ));
  },
  resetForm: function () {
    this.setState({
      id: "",
      title: "",
      body: "",
      is_archived: "",
      saving: "saved"
    });
  },
  importNote: function () {
    this.setState(SelectedStore.getNote());
  },
  newNoteReceived: function () {
    if (!this.state.id && this.state.creating) {
      this.importID();
    } else if (!this.state.id ) {
      this.importNote();
    } else if (SelectedStore.getNote() && (this.state.id !== SelectedStore.getNote().id)) {
      this.changeSelectedNote();
    } else if (!SelectedStore.getNote()) {
      this.resetForm();
    }
  },
  componentDidMount: function () {
    SelectedStore.addNoteChangeListener(this.newNoteReceived);
  },
  componentWillUnmount: function () {
    this.handleSubmit();
  },
  handleSubmit: function (e, callback) {
    clearTimeout(this.timeoutID);
    this.timeoutID = null;

    if (e) {
      e.preventDefault();
    }
    if (this.state.creating) {
      return;
    }
    if (this.state.saving === "saving" || this.state.saving === "dirty") {

      var apiCallback = function (data) {
        var note = NoteStore.getByID(data.id);
        this.setState({creating: false});
        if (typeof callback === "function") {
          callback();
        }
      }.bind(this);

      var note = {
          title: this.state.title,
          body: this.state.body,
      };
      if (this.state.id) {
        note.id = this.state.id;
        note.is_archived = this.state.is_archived;
        NotesAPIUtil.editNote(note, apiCallback);
      } else {
        if (this.state.title.length === 0 && this.state.body.length === 0 ) {
          this.setState({saving: "saved"});
          return;
        }
        note = {
          title: this.state.title,
          body: this.state.body,
        };
        this.setState({creating: true});
        NotesAPIUtil.createNote(note, apiCallback);
      }
    }
    if (e) {
      this.props.toggleIndex();
    }

  },


  saveTimeout: function () {
    if (this.state.saving !== "saving") {
      clearTimeout(this.timeoutID);
      this.timeoutID = setTimeout(function () {
        this.setState({saving: "saving"});
        this.handleSubmit(null, function () {
          this.setState({saving: "saved"});
        }.bind(this));
      }.bind(this), 2000);
    }
  },
  updateBody: function(e) {
    this.setState({body: e.currentTarget.value, saving: "dirty"});
    this.saveTimeout();
  },
  updateTitle: function(e) {
    this.setState({title: e.currentTarget.value, saving: "dirty"});
    this.saveTimeout();
  },
  newNote: function (e) {
    e.preventDefault();
    this.setState({
      id: "",
      title: "",
      body: "",
      is_archived: ""
    });
    this.props.setSelected(null);
  },
  cancel: function (e) {
    e.preventDefault();
    this.props.toggleIndex();
  },
  render: function() {
    var formClass = "note-form ";
    var cancelButtonClass = "cancel-button";
    var saveButtonClass = "save-button";



    if (this.props.fullWidth) {
      formClass += "new";
    } else {
      formClass += "edit";
      saveButtonClass += " hidden";
      cancelButtonClass += " hidden";
    }
    if (this.state.title.length === 0 && this.state.body.length === 0) {
      saveButtonClass += " hidden";
    } else {
      cancelButtonClass += " hidden";
    }

    return (
      <div className={formClass} >
      <NoteFormHeader note={SelectedStore.getNote()} containerClass={formClass} />
        <form onSubmit={this.handleSubmit}>
          <div className="button-container">
            <button className={saveButtonClass}>Done</button>
            <button className={cancelButtonClass} onClick={this.cancel}>Cancel</button>
          </div>
          <label htmlFor="noteTitle">Note Title</label>
            <br />
            <input
              id="noteTitle"
              type="text"
              placeholder={"Title your note"}
              name="title"
              value={this.state.title}
              onChange={this.updateTitle}
            />
            <div className={"save-indicator " + this.state.saving} />
          <br />
          <label htmlFor="noteBody">Note Body</label>
            <br />
            <textarea
              id="noteBody"
              name="body"
              placeholder={"Drag files here or just start typing..."}
              value={this.state.body}
              onChange={this.updateBody}
            />
          <br />

        </form>
      </div>
    );
  }
});
