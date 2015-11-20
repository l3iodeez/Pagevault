(function(root) {
  'use strict';
  var _note = {};
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
      this._noteChanged();
    },

    _noteChanged : function () {
      this.emit(CHANGE_EVENT);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      if (payload.actionType === NoteConstants.NOTE_SELECTED) {
        SelectedStore.setNote(payload.note);
      } else if ( payload.actionType === NoteConstants.NOTE_RECEIVED) {
        debugger
        if (typeof _note === "undefined") {
        }
      }
    }),

  });


}(this));
