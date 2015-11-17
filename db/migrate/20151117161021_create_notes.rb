class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.references :user, null: false, index: true, foreign_key: true
      t.boolean :archived, default: false

      t.timestamps null: false
    end
  end
end
