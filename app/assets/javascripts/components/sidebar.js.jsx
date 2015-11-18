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
        <button className="sidebar-item new-note" onClick={this.newNote}>+</button>
        <button className="sidebar-item search-note" >🔎</button>
        <button className="sidebar-item notes" >&#128441;</button>
      <button className="sidebar-item notebooks" >📓</button>
      </div>
    );
  }
});
