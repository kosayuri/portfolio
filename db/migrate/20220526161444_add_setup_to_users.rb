class AddSetupToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :se_volume, :integer, null: false, default: 10
    add_column :users, :bgm_volume, :integer, null: false, default: 10
  end
end
