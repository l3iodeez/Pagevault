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
    };
  },
  componentWillReceiveProps: function (newProps) {
    var title = newProps.note ? newProps.note.title : "";
    var body = newProps.note ? newProps.note.body : "";
    this.setState({
      title: title,
      body: body
    });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    if (this.state.title.length === 0 && this.state.body.length === 0 ) {
      return;
    }

    var note;

    if (this.props.note) {

      note = {
        id: this.props.note.id,
        title: this.state.title,
        body: this.state.body,
        is_archived: this.state.is_archived
      };
      ApiUtil.editNote(note, function (data) {
        var note = NoteStore.getByID(data.id);
        SelectedStore.setNote(note);
      });
      this.setState(note);

    } else {

      note = {
        title: this.state.title,
        body: this.state.body,
      };
      ApiUtil.createNote(note, function (data) {
        var note = NoteStore.getByID(data.id);
        SelectedStore.setNote(note);
      });

    }
    if (this.props.fullWidth) {
      this.props.toggleIndex();
    }
  },

  updateAttribute: function(attr, e) {
    this.state[attr] = e.currentTarget.value;
    this.forceUpdate();
    // usage:
    // this.updateAttribute.bind(this, "body")
  },

  updateBody: function(e) {
    this.setState({body: e.currentTarget.value});
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
  cancel: function () {
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
      <form className={formClass} onSubmit={this.handleSubmit}>
        <div className="button-container">
          <button className={saveButtonClass}>Done</button>
          <button className={cancelButtonClass} onClick={this.cancel}>Cancel</button>
        </div>
        <label htmlFor="noteTitle">Note Title</label>
          <br />
          <input id="noteTitle" type="text" placeholder={"Title your note"} name="title" valueLink={this.linkState("title")} />
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
    );
  }
});
