class CreateImageUploads < ActiveRecord::Migration
  def change
    create_table :image_uploads do |t|
      t.references :note, index: true, foreign_key: true
      t.attachment :image

      t.timestamps null: false
    end
  end
end
