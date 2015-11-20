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
  // sessions api functions


  };
}(this));
