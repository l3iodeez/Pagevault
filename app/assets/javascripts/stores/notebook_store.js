(function(root) {
  'use strict';
  var _notebooks = [];
  var CHANGE_EVENT = "notebooksChange";


  root.NotebookStore = $.extend({}, EventEmitter.prototype, {

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    all: function () {
      return _notebooks.slice(0);
    },

    getByID: function (notebookId) {
      var foundNote = _notebooks.find(function (notebook) {
        return notebook.id === notebookId;
      });
      return foundNote;
    },

    getFirst: function () {
      return _notebooks[0];
    },

    storeNotebook: function (recvdNotebook) {
      var storedNotebook = NotebookStore.getByID(recvdNotebook.id);
      if (storedNotebook) {
        var idx = _notebooks.indexOf(storedNotebook);
        _notebooks.splice(idx, 1);
      }
      _notebooks.unshift(recvdNotebook);
      NotebookStore._notebooksChanged();
    },

    deleteNotebook: function (notebook) {
      var storedNotebook = NotebookStore.getByID(notebook.id);
      var idx = _notebooks.indexOf(storedNotebook);
      _notebooks.splice(idx, 1);
      NotebookStore._notebooksChanged();
    },

    resetNotebooks: function (notebooks) {
      _notebooks = notebooks;
      NotebookStore._notebooksChanged();
    },

    _notebooksChanged : function () {
      this.emit(CHANGE_EVENT);
    },
    setFirstNote: function (note) {
      _notebooks[note.notebook_id].firstNote = note;
    },
    dispatcherId: AppDispatcher.register(function (payload) {
      if (payload.actionType === NotebookConstants.NOTEBOOKS_RECEIVED) {
        NotebookStore.resetNotebooks(payload.notebooks);
      } else if (payload.actionType === NotebookConstants.NOTEBOOK_RECEIVED) {
        NotebookStore.storeNotebook(payload.notebook);
      } else if (payload.actionType === NotebookConstants.NOTEBOOK_DELETED) {
        NotebookStore.deleteNotebook(payload.notebook);
      } else if (payload.actionType === NoteConstants.NOTE_RECEIVED) {
        if (CurrentUserStore.currentUser.id === payload.note.owner) {
          NotebookStore.getByID(payload.note.notebook_id).firstNote = payload.note;
        }
      } else if (payload.actionType === NoteConstants.NOTE_DELETED) {
        if (NoteStore.getByNotebookID(payload.note.notebook_id).length === 0) {
          NotebookStore.getByID(payload.note.notebook_id).firstNote = null;
        }
      }
    }),

  });


}(this));
