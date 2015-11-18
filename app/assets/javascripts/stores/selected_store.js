(function(root) {
  'use strict';
  var _note = null;
  var CHANGE_EVENT = "selectedChange";


  root.SelectedStore = $.extend({}, EventEmitter.prototype, {

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    getNote: function () {
      return _note;
    },

    setNote: function (note) {
      _note = note;
    },

    _noteChanged : function () {
      this.emit(CHANGE_EVENT);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      if (payload.actionType === NoteConstants.NOTE_SELECTED) {
        SelectedStore.setNote(payload.note);
      }
    }),

  });


}(this));
