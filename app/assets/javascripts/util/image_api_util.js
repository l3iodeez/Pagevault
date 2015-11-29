(function(root) {
  'use strict';
  var ImageAPIUtil = root.ImageAPIUtil = {
    createImage: function (image, noteId, callback) {
      debugger
      $.ajax({
        url: '/api/image_uploads',
        method: 'POST',
        dataType: 'image/jpeg',
        data: {image: image, note_id: noteId},
        success: function (data) {
          debugger
          if (typeof callback === "function") {
            callback(data);
          }
        },
        failure: function () {
          debugger
        }
      });
    },
  };
}(this));
