var Sidebar = React.createClass({

  logout: function () {
    SessionsApiUtil.logout();
  },
  newNote: function () {
    SelectedStore.setNote(null);
    this.props.toggleNoteIndex();
  },
  viewNotebooks: function () {
    this.props.toggleNotebookIndex();
  },
  search: function () {
    this.props.toggleSearch();
  },
  render: function() {
    var sidebarClass = "sliding-pane sidebar";
    if (!this.props.showNoteIndex) {
      sidebarClass += " hidden";
    }
    return (
      <div className={sidebarClass} >
        <div className="sidebar-item logo" />
        <button className="sidebar-item new-note" onClick={this.newNote}><div><i className="fa fa-plus" /></div></button>
        <button className="sidebar-item search" onClick={this.search}><div><i className="fa fa-search" /></div></button>
        <button className="sidebar-item view-notes" ><div><i className="fa fa-sticky-note" /></div></button>
        <button className="sidebar-item notebooks" onClick={this.viewNotebooks} ><div><i className="fa fa-book" /></div></button>
        <button className="sidebar-item logout" onClick={this.logout}><div><i className="fa fa-power-off" /></div></button>
      </div>
    );
  }
});
