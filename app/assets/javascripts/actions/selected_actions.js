(function(root) {
  'use strict';
  var SelectedActions = root.SelectedActions = {
    setSelectedNote: function (note) {
      AppDispatcher.dispatch({
        actionType: NoteConstants.NOTE_SELECTED,
        note: note
      });
    },
    setSelectedNotebook: function (notebook) {
      AppDispatcher.dispatch({
        actionType: NotebookConstants.NOTEBOOK_SELECTED,
        notebook: notebook
      });
    }
  };
}(this));
