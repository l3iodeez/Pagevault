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
        <button className="sidebar-item new-note" onClick={this.newNote}><div></div></button>
        <button className="sidebar-item search" onClick={this.search}><div></div></button>
        <button className="sidebar-item view-notes" ><div></div></button>
        <button className="sidebar-item notebooks" onClick={this.viewNotebooks} ><div></div></button>
        <button className="sidebar-item logout" onClick={this.logout}><div></div></button>
      </div>
    );
  }
});
