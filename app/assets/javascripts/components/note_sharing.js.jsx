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
  setTimeout: function () {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout(function () {
      this.setState({status: "searching"});
      SearchAPIUtil.search(this.state.searchString, function (data) {
        this.setState({searchResults: data});
      }.bind(this),"User");
    }.bind(this), 300);
  },
  searchStringChanged: function (e) {
    this.setTimeout();
    this.setState({searchString: e.currentTarget.value});
  },
  deleteShare: function (e) {
    SharesAPIUtil.deleteShare();
  },
  createShare: function () {

  },
  render: function() {

    return (
      <div className="share-note-form" >
        <input type="text" placeholder= "search by name or email..." onChange={this.searchStringChanged} />
        <ul>
          <li>SearchResult</li>
            {this.state.searchResults.map(function (user) {
              return (<li key={user.id} onClick={this.createShare}>
                        {user.name} - {user.email}
                        <i className="fa fa-plus" />
                      </li>);
            })}
          <li>Existing permissions</li>
            {this.state.shares.map(function (share) {
              return (<li key={share.id} onClick={this.deleteShare} >
                        {share.name} - {share.email}
                        <i className="fa fa-times" />
                      </li>);
            })}
        </ul>
      </div>
    );
  }
});
