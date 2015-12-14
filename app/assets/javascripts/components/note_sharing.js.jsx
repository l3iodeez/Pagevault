var NoteSharing = React.createClass({
  getInitialState: function() {
    return {
      shares: (this.props.note ? ShareStore.getByNoteID(this.props.note.id) : []),
      searchString: "",
      searchResults: [],
    };
  },
  sharesChanged: function (e) {
    if (this.props.note && SelectedStore.getNote()) {
      this.setState({
        shares: ShareStore.getByNoteID(SelectedStore.getNote().id).filter(function (el) {
          return el.user_id !== CurrentUserStore.currentUser().id;
        }.bind(this))
      });
    } else {
      this.timeoutID = setTimeout(function () {
        this.sharesChanged(); // eliminate this by using waitFor on the dispatcher action
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
        <div className="results-list">
        <input type="text" placeholder= "search by name or email..." onChange={this.searchStringChanged} />
          <ul className="share-item-container">
              {this.state.searchResults.map(function (user, i) {
                return (
                        <li className="search-result-item" key={i}  >
                          <p className="name">{user.name}</p>
                          <p className="email">{user.email}</p>
                          <div className="add-share">
                            <i onClick={this.createShare} data-id={user.id} title="Share with this user" className="fa fa-plus" />
                          </div>
                        </li>
                        );
              }.bind(this))}
          </ul>
        </div>
        <div className="existing-list">
          <h3>Currently sharing with:</h3>
          <ul className="share-item-container">
              {this.state.shares.map(function (share, i) {
                return (<li className="search-result-item" key={i}  >
                        <p className="name">{share.name}</p>
                        <p className="email">{share.email}</p>
                        <div className="add-share">
                          <span>Allow edits?</span>
                          <div className="fancyCheck">
                            <input id={"share"+i} type="checkbox" data-id={share.id} data-userid={share.user_id} checked={share.is_writable} onChange={this.updateShare}></input>
                            <label htmlFor={"share"+i} />
                          </div>
                          <i onClick={this.deleteShare} data-id={share.id}  title="Remove sharing" data-writable={share.is_writable} className="fa fa-times" />
                        </div>
                      </li>);
              }.bind(this))}
          </ul>
        </div>
      </div>
    );
  }
});
