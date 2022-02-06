class AddMostRecentNoteToUsers < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :recent_note_id, :integer
  end
end
