(function(root) {
  'use strict';

  // note api functions
  var ApiActions = root.ApiActions = {
    receiveAllNotes: function(notes){
      AppDispatcher.dispatch({
        actionType: NoteConstants.NOTES_RECEIVED,
        notes: notes
      });
    },
    receiveSingleNote: function (note) {
      AppDispatcher.dispatch({
        actionType: NoteConstants.NOTE_RECEIVED,
        note: note
      });
    },
    deleteNote: function (note) {
      AppDispatcher.dispatch({
        actionType: NoteConstants.NOTE_DELETED,
        note: note
      });
    },
    receiveAllNotebooks: function(notebooks){
      AppDispatcher.dispatch({
        actionType: NotebookConstants.NOTEBOOKS_RECEIVED,
        notebooks: notebooks
      });
    },
    receiveSingleNotebook: function (notebook) {
      AppDispatcher.dispatch({
        actionType: NotebookConstants.NOTEBOOK_RECEIVED,
        notebook: notebook
      });
    },
    deleteNotebook: function (notebook) {
      AppDispatcher.dispatch({
        actionType: NotebookConstants.NOTEBOOK_DELETED,
        notebook: notebook
      });
    },
  // sessions api functions


  };
}(this));
