var NoteForm = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    var id = this.props.note ? this.props.note.id : "";
    var title = this.props.note ? this.props.note.title : "";
    var body = this.props.note ? this.props.note.body : "";
    var is_archived = this.props.note ? this.props.note.is_archived : false;

    return {
      id: id,
      title: title,
      body: body,
      is_archived: is_archived,
      saving: "saved"
    };
  },
  componentWillReceiveProps: function (newProps) {
    if (this.timeoutID) {
      this.handleSubmit();
    }
    var title = newProps.note ? newProps.note.title : "";
    var body = newProps.note ? newProps.note.body : "";
    this.setState({
      title: title,
      body: body,
      saving: "saved"
    });
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
    if (this.state.saving === "saving" || this.state.saving === "dirty") {
      var apiCallback = function (data) {
        var note = NoteStore.getByID(data.id);
        // SelectedStore.setNote(note);
        if (typeof callback === "function") {
          callback();
        }
      };

      var note;
        note = {
          title: this.state.title,
          body: this.state.body,
        };
      if (this.props.note) {
        note.id = this.props.note.id;
        note.is_archived = this.state.is_archived;
        ApiUtil.editNote(note, apiCallback);
      } else {
        if (this.state.title.length === 0 && this.state.body.length === 0 ) {
          this.setState({saving: "saved"});
          return;
        }
        note = {
          title: this.state.title,
          body: this.state.body,
        };
        ApiUtil.createNote(note, apiCallback);
      }
    }
    if (e) {
      this.props.toggleIndex();
    }

  },


  saveTimeout: function () {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(function () {
      this.setState({saving: "saving"});
      this.handleSubmit(null, function () {
        this.setState({saving: "saved"});
      }.bind(this));
    }.bind(this), 2000);
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
      <NoteFormHeader note={this.props.note} containerClass={formClass} />
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
