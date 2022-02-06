class AddDimensionsToImageUploads < ActiveRecord::Migration[4.2]
  def change
    add_column :image_uploads, :dimensions, :json, null: false
  end
end
