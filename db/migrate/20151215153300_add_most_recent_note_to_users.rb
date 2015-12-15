class AddMostRecentNoteToUsers < ActiveRecord::Migration
  def change
    add_column :users, :recent_note_id, :integer
  end
end
