class CreateTaggings < ActiveRecord::Migration[4.2]
  def change
    create_table :taggings do |t|
      t.references :tag, index: true, foreign_key: true
      t.belongs_to :taggable, :polymorphic => true, :index => true

      t.timestamps null: false
    end
  end
end
