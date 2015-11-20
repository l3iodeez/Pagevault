class AddNotebookIdToNotes < ActiveRecord::Migration
  def change
    change_table :notes do |t|
      t.references :notebook
    end
  end
end
