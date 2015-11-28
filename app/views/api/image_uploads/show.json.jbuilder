json.extract!(
@image_upload,
:id,
)
json.location(
  @image_upload.image.url
)
