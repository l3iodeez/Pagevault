(function(root) {
  'use strict';
  var _modal = null;
  var CHANGE_EVENT = "modalChange";

  root.ModalStore = $.extend({}, EventEmitter.prototype, {



    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },
    currentModal: function () {
      return $.extend({}, _modal);
    },
    _modalChanged : function () {
      this.emit(CHANGE_EVENT);
    },
    _raiseModal: function (modalData) {
      _modal = modalData;
      this._modalChanged();
    },
    _closeModal: function (modalData) {
      _modal = null;
      this._modalChanged();
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      if (payload.actionType === ModalConstants.MODAL_RAISED) {
        ModalStore._raiseModal(payload.modalData);
      } else if (payload.actionType === ModalConstants.MODAL_CLOSED) {
        ModalStore._closeModal(payload.modalData);

      }
    }),

  });


}(this));
