class AddHideEncryptWarningToUsers < ActiveRecord::Migration
  def change
    add_column :users, :hide_encrypt_warning, :boolean, default: false
  end
end
