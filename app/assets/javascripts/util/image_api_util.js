(function(root) {
  'use strict';
  var ImageAPIUtil = root.ImageAPIUtil = {
    createImage: function (image, noteId, callback) {
      $.ajax({
        url: '/api/image_uploads',
        method: 'POST',
        dataType: 'image/jpeg',
        data: {image: image, note_id: noteId},
        success: function (data) {
          if (typeof callback === "function") {
            callback(data);
          }
        },
        failure: function () {
        }
      });
    },
  };
}(this));
