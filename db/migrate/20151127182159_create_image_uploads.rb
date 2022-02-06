class CreateImageUploads < ActiveRecord::Migration[4.2]
  def change
    create_table :image_uploads do |t|
      t.references :note, index: true, foreign_key: true
      t.attachment :image

      t.timestamps null: false
    end
  end
end
