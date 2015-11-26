(function(root) {
  'use strict';
  var SharesAPIUtil = root.SharesAPIUtil = {
    fetchAllShares: function (callback) {
      $.ajax({
        url: '/api/shares',
        method: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          ApiActions.receiveShares(data);
          callback && callback(data);
        }
      });
    },
    createShare: function (share) {
      $.ajax({
        url: '/api/shares',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: {share: share},
        success: function (data) {
          ApiActions.addShare(data);
          callback && callback(data);
        }
      });
    },
    deleteShare: function (shareId) {
      $.ajax({
        url: '/api/shares/' + shareId,
        method: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        data: {share: share},
        success: function (data) {
          ApiActions.deleteShare(data);
          callback && callback(data);
        }
      });
    }
  };
}(this));
