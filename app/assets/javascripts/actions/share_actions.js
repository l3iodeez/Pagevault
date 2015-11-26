var ShareActions = {

  receiveShares: function (shares) {
    AppDispatcher.dispatch({
      actionType: ShareConstants.SHARES_RECEIVED,
      shares: shares
    });
  },
  addShare: function (share) {
    AppDispatcher.dispatch({
      actionType: ShareConstants.ADD_SHARE,
      share: share
    });
  },
  deleteShare: function (share) {
    AppDispatcher.dispatch({
      actionType: ShareConstants.DELETE_SHARE,
      share: share
    });
  }

};
