(function(root) {
  'use strict';
  var _shares = [];
  var CHANGE_EVENT = "sharesChange";


  root.ShareStore = $.extend({}, EventEmitter.prototype, {

    addChangeListener: function(callback){
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback){
      this.removeListener(CHANGE_EVENT, callback);
    },

    all: function () {
      return _shares.slice(0);
    },

    getByNoteID: function (noteId) {
      var foundNote = _shares.filter(function (share) {
        return share.note_id === noteId;
      });
      return foundNote;
    },

    getByID: function (shareId) {
      var foundShare = _shares.filter(function (share) {
        return share.id === shareId;
      });
      return foundShare;
    },

    getFirst: function () {
      return _shares[0];
    },

    storeShare: function (recvdShare) {
      var storedShare = ShareStore.getByID(recvdShare.id);
      if (storedShare) {
        var idx = _shares.indexOf(storedShare);
        _shares.splice(idx, 1);
      }
      _shares.unshift(recvdShare);
      ShareStore._sharesChanged();
    },

    deleteShare: function (share) {
      var storedShare = ShareStore.getByID(share.id);
      var idx = _shares.indexOf(storedShare);
      _shares.splice(idx, 1);
      ShareStore._sharesChanged();
    },

    resetShares: function (shares) {
      _shares = shares;
      ShareStore._sharesChanged();
    },

    _sharesChanged : function () {
      this.emit(CHANGE_EVENT);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      if (payload.actionType === ShareConstants.SHARES_RECEIVED) {
        ShareStore.resetShares(payload.shares);
      } else if (payload.actionType === ShareConstants.ADD_SHARE) {
        ShareStore.storeShare(payload.share);
      } else if (payload.actionType === ShareConstants.DELETE_SHARE) {
        ShareStore.deleteShare(payload.share);
      } else if (payload.actionType === ShareConstants.UPDATE_SHARE) {
        ShareStore.storeShare(payload.share);
      }
    }),

  });


}(this));
