var Sidebar = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {

  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  },
  newNote: function () {
    SelectedStore.setNote(null);
    this.props.toggleIndex();
  },
  render: function() {
    var sidebarClass = "sidebar";
    if (!this.props.showIndex) {
      sidebarClass += " hidden";
    }
    return (
      <div className={sidebarClass} >
        <div className="sidebar-item logo" />
        <button className="sidebar-item new-note" onClick={this.newNote}><div></div></button>
        <button className="sidebar-item search" ><div></div></button>
        <button className="sidebar-item view-notes" ><div></div></button>
      <button className="sidebar-item notebooks" ><div></div></button>
      </div>
    );
  }
});
