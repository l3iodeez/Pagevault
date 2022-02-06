class AddIsEncryptedToNotes < ActiveRecord::Migration[4.2]
  def change
    add_column :notes, :is_encrypted, :boolean, default: false
  end
end
