(function(root) {
  'use strict';
  var _notes = [];
  var CHANGE_EVENT = "notesChange";


  root.NoteStore = $.extend({}, EventEmitter.prototype, {

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    all: function () {
      return _notes.slice(0);
    },

    getByID: function (noteId) {
      var foundNote = _notes.find(function (note) {
        return note.id === noteId;
      });
      return foundNote;
    },

    storeNote: function (recvdNote) {
      var storedNote = _notes.find(function (note) {
        return note.id === recvdNote.id;
      });
      if (storedNote) {
        var idx = _notes.indexOf(storedNote);
        _notes[idx] = recvdNote;
      } else {
        _notes.push(recvdNote);
      }
      NoteStore._notesChanged();

    },
    resetNotes: function (notes) {
      _notes = notes;
      NoteStore._notesChanged();
    },

    _notesChanged : function () {
      this.emit(CHANGE_EVENT);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      if (payload.actionType === NoteConstants.NOTES_RECEIVED) {
        NoteStore.resetNotes(payload.notes);
      } else if (payload.actionType === NoteConstants.NOTE_RECEIVED) {
        NoteStore.storeNote(payload.note);
      }
    }),

  });


}(this));
