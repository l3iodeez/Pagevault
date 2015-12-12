var NotebooksIndexItem = React.createClass({
  getInitialState: function () {
    return {confirming: false, tags: this.props.notebook.tags, dirty: false};
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
  enterTags: function (e) {
    e.stopPropagation();
    e.preventDefault();
  },
  changeTags: function (e) {
    this.setState({tags:e.currentTarget.value });
  },
  updateTags: function (e) {
    e.stopPropagation();
    e.preventDefault();
    
    if (this.state.tags.length === 0) {
      return;
    }
    this.setState({dirty: true});
    var tags = this.state.tags.split(',').map(function (tag) {
        return tag.trim().toLowerCase().split(' ');
    }).reduce(function(a, b) {
      return a.concat(b);
    });
    var notebook = {
      id: this.props.notebook.id,
      title: this.props.notebook.title,
      description: this.props.notebook.description,
      tags: tags
    };
    NotebooksAPIUtil.editNotebook(notebook, function () {
      this.setState({dirty: false});
    }.bind(this));
  },

  render: function() {
    var indexThumbnail;
    if (this.props.notebook.firstNote) {
      var thumbnailClass = "";
      var thumbnailLink = this.props.notebook.firstNote.thumbnail;
      if ( thumbnailLink ) {
        if (this.props.notebook.firstNote.portrait) {
          thumbnailClass += " portrait";
        }
        indexThumbnail = (
          <div className="thumbnail" >
            <img className={thumbnailClass } src={thumbnailLink} />
          </div>
        );
      }
    }
    var modifiedDate = Helpers.formatDate(new Date(this.props.notebook.updated_at));
    return (
      <ul className="notebook-index-item" onClick={!this.state.confirming ? this.handleClick : null}>
        <button onClick={this.showConfirm} className="delete-notebook"><i className="fa fa-trash" /></button>
        <form onSubmit={this.updateTags} className="notebook-edit-form">
          <li>{this.props.notebook.title}</li>
          <li>{modifiedDate}</li>
          <li>{this.props.notebook.description}</li>
          <div className="tag-input-form notebook-tags">
            <span>Tags:</span>
            <input
              onClick={this.enterTags}
              type="text"
              className="tag-input notebook-tags"
              value={this.state.tags}
              onBlur={this.updateTags}
              onChange={this.changeTags}></input>
            {this.state.dirty ? (
              <div className="tiny-spinner notebook-tags">
                <i className="fa fa-spinner fa-spin" />
              </div>) : null}
          </div>
        </form>
        {indexThumbnail}
      </ul>
    );
  }
});
