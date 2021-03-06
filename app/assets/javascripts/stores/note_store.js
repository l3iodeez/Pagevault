(function(root) {
  'use strict';
  var _notes = {};
  var CHANGE_EVENT = "notesChange";


  root.NoteStore = $.extend({}, EventEmitter.prototype, {

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    all: function () {
      var collection = [];
      for (var key in _notes) {
        collection = collection.concat(_notes[key]);
      }
      return collection;
    },

    getByID: function (noteId) {
      var foundNote = NoteStore.all().find(function (note) {
        return note.id === noteId;
      });
      return foundNote;
    },
    getByNotebookID: function (notebookId) {
      if (_notes[notebookId]) {
        return _notes[notebookId].slice(0).sort(Helpers.sortBy("updated_at", "DESC"));
      }
        return [];
    },

    getFirst: function (notebookId) {
      if (!notebookId) {
        if (notebookId === 0) {
          return Helpers.first(_notes)[_notes.length -1];
        } else {
          return;
        }
      }
      return _notes[notebookId][_notes.length - 1];
    },

    storeNote: function (recvdNote) {
      var storedNote = NoteStore.getByID(recvdNote.id);
      if (storedNote) {
        var idx = _notes[storedNote.notebook_id].indexOf(storedNote);
        _notes[storedNote.notebook_id].splice(idx, 1);
      }
      if (recvdNote.owner !== CurrentUserStore.currentUser().id ) {
        _notes[0] = _notes[0] || [];
        _notes[0].unshift(recvdNote);

      }
      _notes[recvdNote.notebook_id]= _notes[recvdNote.notebook_id] || [];
      _notes[recvdNote.notebook_id].unshift(recvdNote);
      NoteStore._notesChanged();
    },

    deleteNote: function (note) {
      var storedNote = NoteStore.getByID(note.id);
      var idx = _notes[storedNote.notebook_id].indexOf(storedNote);
      _notes[storedNote.notebook_id].splice(idx, 1);
      NoteStore._notesChanged();
    },

    resetNotes: function (notes) {
      notes.forEach(function (note) {
        this.storeNote(note);
      }.bind(this));
    },

    _notesChanged : function () {
      this.emit(CHANGE_EVENT);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      if (payload.actionType === NoteConstants.NOTES_RECEIVED) {
        NoteStore.resetNotes(payload.notes);
      } else if (payload.actionType === NoteConstants.NOTE_RECEIVED) {
        NoteStore.storeNote(payload.note);
      } else if (payload.actionType === NoteConstants.NOTE_DELETED) {
        NoteStore.deleteNote(payload.note);
      }
    }),

  });


}(this));
