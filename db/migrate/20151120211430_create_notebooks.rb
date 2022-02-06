class CreateNotebooks < ActiveRecord::Migration[4.2]
  def change
    create_table :notebooks do |t|
      t.references :user, index: true, foreign_key: true, null: false
      t.string :title
      t.string :description

      t.timestamps null: false
    end
  end
end
