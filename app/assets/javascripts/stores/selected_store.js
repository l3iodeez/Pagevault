(function(root) {
  'use strict';
  var _note = null;
  var _notebook = null;
  var NOTE_CHANGE_EVENT = "selectedNoteChange";
  var NOTEBOOK_CHANGE_EVENT = "selectedNotebookChange";



  root.SelectedStore = $.extend({}, EventEmitter.prototype, {

    addNoteChangeListener: function(callback){
      this.on(NOTE_CHANGE_EVENT, callback);
    },

    removeNoteChangeListener: function(callback){
      this.removeListener(NOTE_CHANGE_EVENT, callback);
    },

    addNotebookChangeListener: function(callback){
      this.on(NOTEBOOK_CHANGE_EVENT, callback);
    },

    removeNotebookChangeListener: function(callback){
      this.removeListener(NOTEBOOK_CHANGE_EVENT, callback);
    },
    getNote: function () {
      return _note;
    },

    setNote: function (note) {
      _note = note;
      this._noteChanged();
    },
    getNotebook: function () {
      return _notebook;
    },

    setNotebook: function (notebook) {
      _notebook = notebook;
      this._notebookChanged();
    },

    _noteChanged : function () {
      this.emit(NOTE_CHANGE_EVENT);
    },
    _notebookChanged : function () {
      this.emit(NOTEBOOK_CHANGE_EVENT);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      if (payload.actionType === NoteConstants.NOTE_SELECTED) {
        SelectedStore.setNote(payload.note);
      } else if ( payload.actionType === NoteConstants.NOTE_RECEIVED) {
        if (!_note) {
          SelectedStore.setNote(payload.note);
        }
      } else if ( payload.actionType === NoteConstants.NOTES_RECEIVED) {
        if (!_note) {
          SelectedStore.setNote(NoteStore.getFirst(0));
        }
      } else if ( payload.actionType === NotebookConstants.NOTEBOOKS_RECEIVED) {
        if (!_notebook) {
          SelectedStore.setNotebook(NotebookStore.getFirst());
        }
      } else if ( payload.actionType === NotebookConstants.NOTEBOOK_SELECTED) {
        SelectedStore.setNotebook(payload.notebook);
        if (!_note && payload.notebook) {
          SelectedStore.setNote(payload.notebook.firstNote);
        }
      } else if ( payload.actionType === NotebookConstants.NOTEBOOK_DELETED) {
        if (SelectedStore.getNotebook().id === payload.notebook.id) {
        debugger
          SelectedStore.setNotebook(NotebookStore.getFirst());
          SelectedStore.setNote(NoteStore.getFirst(NotebookStore.getFirst().id));
        }
      }
    }),

  });


}(this));
