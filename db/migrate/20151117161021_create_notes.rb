class CreateNotes < ActiveRecord::Migration[4.2]
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.references :user, null: false, index: true, foreign_key: true
      t.boolean :is_archived, default: false

      t.timestamps null: false
    end
  end
end
