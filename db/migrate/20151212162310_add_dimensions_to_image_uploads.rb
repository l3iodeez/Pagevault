class AddDimensionsToImageUploads < ActiveRecord::Migration
  def change
    add_column :image_uploads, :dimensions, :json, null: false
  end
end
