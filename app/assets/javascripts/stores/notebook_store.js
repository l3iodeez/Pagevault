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
        var idx = _notebooks.indexOf(storedNotenook);
        _notes.splice(idx, 1);
      }
      _notebooks.unshift(recvdNotebook);
      NoteStore._notebooksChanged();
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

    dispatcherId: AppDispatcher.register(function (payload) {
      if (payload.actionType === NotebookConstants.NOTEBOOKS_RECEIVED) {
        NotebookStore.resetNotebooks(payload.notebooks);
      } else if (payload.actionType === NotebookConstants.NOTEBOOK_RECEIVED) {
        NotebookStore.storeNotebook(payload.notebook);
      } else if (payload.actionType === NotebookConstants.NOTEBOOK_DELETED) {
        NotebookStore.deleteNotebook(payload.notebook);
      }
    }),

  });


}(this));
