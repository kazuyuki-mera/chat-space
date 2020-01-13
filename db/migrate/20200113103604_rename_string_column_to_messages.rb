class RenameStringColumnToMessages < ActiveRecord::Migration[5.0]
  def change
    rename_column :messages, :string, :image
  end
end
