class AddSearchHashToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :search_hash, :string
  end
end
