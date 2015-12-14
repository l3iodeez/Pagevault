var Sidebar = React.createClass({

  logout: function () {
    SessionsApiUtil.logout();
  },
  newNote: function () {
    SelectedStore.setNote(null);
    this.props.toggleNoteIndex();
  },
  viewNotes: function () {
    this.hideNotebooks();
    this.hideSearch();
  },
  viewNotebooks: function () {
    this.hideSearch();
    this.props.toggleNotebookIndex();
  },
  hideNotebooks: function () {
    if (this.props.showNotebookIndex) {
      this.props.toggleNotebookIndex();
    }
  },
  search: function () {
    this.props.toggleSearch();
    this.hideNotebooks();
  },
  hideSearch: function () {
    if (this.props.showSearch) {
      this.props.toggleSearch();
    }
  },
  render: function() {
    var sidebarClass = "sliding-pane sidebar";
    if (!this.props.showNoteIndex) {
      sidebarClass += " hidden";
    }
    return (
      <div className={sidebarClass} >
        <div className="sidebar-item logo" />
        <button title="New note" className="sidebar-item new-note" onClick={this.newNote}><i className="fa fa-plus" /></button>
        <button title="Search" className="sidebar-item search" onClick={this.search}><i className="fa fa-search" /></button>
        <button title="Notes" className="sidebar-item view-notes" onClick={this.viewNotes} ><i className="fa fa-sticky-note" /></button>
        <button title="Notebooks" className="sidebar-item notebooks" onClick={this.viewNotebooks} ><i className="fa fa-book" /></button>
        <button title="Log out" className="sidebar-item logout" onClick={this.logout}><i className="fa fa-power-off" /></button>
      </div>
    );
  }
});
