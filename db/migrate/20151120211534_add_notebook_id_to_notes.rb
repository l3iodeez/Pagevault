class AddNotebookIdToNotes < ActiveRecord::Migration[4.2]
  def change
    change_table :notes do |t|
      t.references :notebook
    end
  end
end
