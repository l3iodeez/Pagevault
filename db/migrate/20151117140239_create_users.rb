class CreateUsers < ActiveRecord::Migration[4.2]
  def change
    create_table :users do |t|
      t.string :email, null: false, unique: true, index: true
      t.string :name, null: false, index: true
      t.string :password_digest, null: false
      t.string :session_token, null: false, unique: true, index: true

      t.timestamps null: false
    end
  end
end
