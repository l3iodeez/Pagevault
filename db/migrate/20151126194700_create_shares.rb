class CreateShares < ActiveRecord::Migration[4.2]
  def change
    create_table :shares do |t|
      t.references :note, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.boolean :is_writable, default: false

      t.timestamps null: false
    end
  end
end
