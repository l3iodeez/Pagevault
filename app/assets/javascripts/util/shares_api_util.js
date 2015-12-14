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
          ShareActions.receiveShares(data);
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
        data: JSON.stringify({share: share}),
        success: function (data) {
          ShareActions.addShare(data);
        }
      });
    },
    updateShare: function (share) {
      $.ajax({
        url: '/api/shares/' + share.id,
        method: 'PATCH',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({share: share}),
        success: function (data) {
          ShareActions.updateShare(data);
        }
      });
    },
    deleteShare: function (shareId, callback) {
      $.ajax({
        url: '/api/shares/' + shareId,
        method: 'DELETE',
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          ShareActions.deleteShare(data);
          callback && callback(data);
        }
      });
    }
  };
}(this));
