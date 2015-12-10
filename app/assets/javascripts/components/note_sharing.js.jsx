var NoteSharing = React.createClass({
  getInitialState: function() {
    return {
      shares: (this.props.note ? ShareStore.getByNoteID(this.props.note.id) : []),
      searchString: "",
      searchResults: [],
    };
  },
  sharesChanged: function () {
    if (this.props.note) {
      this.setState({
        shares: ShareStore.getByNoteID(this.props.note.id)
      });
    } else {
      this.timeoutID = setTimeout(function () {
        this.sharesChanged();
      }.bind(this), 500);
    }
  },
  componentWillMount: function() {
    ShareStore.addChangeListener(this.sharesChanged);
    SelectedStore.addNoteChangeListener(this.sharesChanged);
    SharesAPIUtil.fetchAllShares();
  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {
    ShareStore.removeChangeListener(this.sharesChanged);
    SelectedStore.removeNoteChangeListener(this.sharesChanged);

  },
  shareUserIds: function () {
    var ids = [];
    this.state.shares.forEach(function (share) {
      ids.push(share.user_id);
    }.bind(this));
    return ids;
  },
  removeFromResults: function (id) {
    results = this.state.searchResults.filter(function (el) {
      return el.id != id;
    });
    this.setState({searchResults: results});
  },
  setTimeout: function () {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(function () {
      this.setState({status: "searching"});
      SearchAPIUtil.search(this.state.searchString, function (data) {
        data = data.filter(function (user) {
          return this.shareUserIds().indexOf(user.id) == -1;
        }.bind(this));
        this.setState({searchResults: data});
      }.bind(this),"User");
    }.bind(this), 300);
  },
  searchStringChanged: function (e) {
    this.setTimeout();
    this.setState({searchString: e.currentTarget.value});
  },
  deleteShare: function (e) {
    var share_id = Number(e.currentTarget.dataset.id);
    SharesAPIUtil.deleteShare(share_id);
  },
  createShare: function (e) {
    var user_id = Number(e.currentTarget.dataset.id);
    var note_id = SelectedStore.getNote().id;
    this.removeFromResults(user_id);
    SharesAPIUtil.createShare({user_id: user_id, note_id: note_id, is_writable: false});
  },
  updateShare: function (e) {
    var user_id = Number(e.currentTarget.dataset.userid);
    var note_id = SelectedStore.getNote().id;
    var is_writable = e.currentTarget.checked;
    var share_id = Number(e.currentTarget.dataset.id);
    SharesAPIUtil.updateShare({id: share_id, user_id: user_id, note_id: note_id, is_writable: is_writable});
  },
  render: function() {

    return (
      <div className="share-note-form" >
        <input type="text" placeholder= "search by name or email..." onChange={this.searchStringChanged} />
        <ul>
            {this.state.searchResults.map(function (user, i) {
              return (
                      <li key={user.id}  >
                        {user.name} - {user.email}
                        <i onClick={this.createShare} data-id={user.id}  className="fa fa-plus" />
                      </li>
                      );
            }.bind(this))}
          <li>Existing permissions</li>
            {this.state.shares.map(function (share) {
              return (<li key={share.id}  >
                        {share.name} - {share.email}
                        <input type="checkbox"  data-id={share.id} data-userid={share.user_id} checked={share.is_writable} onChange={this.updateShare}></input>
                        <i onClick={this.deleteShare} data-writable={share.is_writable} className="fa fa-times" />
                      </li>);
            }.bind(this))}
        </ul>
      </div>
    );
  }
});
