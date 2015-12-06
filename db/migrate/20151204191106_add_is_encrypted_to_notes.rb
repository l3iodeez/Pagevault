class AddIsEncryptedToNotes < ActiveRecord::Migration
  def change
    add_column :notes, :is_encrypted, :boolean, default: false
  end
end
