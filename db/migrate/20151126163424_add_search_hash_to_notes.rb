class AddSearchHashToNotes < ActiveRecord::Migration[4.2]
  def change
    add_column :notes, :search_hash, :string
  end
end
