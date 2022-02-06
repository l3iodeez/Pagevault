class AddHideEncryptWarningToUsers < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :hide_encrypt_warning, :boolean, default: false
  end
end
