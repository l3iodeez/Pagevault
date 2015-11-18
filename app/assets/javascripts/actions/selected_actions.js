(function(root) {
  'use strict';
  var SelectedActions = root.SelectedActions = {
    setSelected: function (note) {
      AppDispatcher.dispatch({
        actionType: NoteConstants.NOTE_SELECTED,
        note: note
      });
    }
  };
}(this));
