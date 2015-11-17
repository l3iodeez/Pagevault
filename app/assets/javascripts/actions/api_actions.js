(function(root) {
  'use strict';
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
    }
  };
}(this));
