class AddColumnToFloppyDot < ActiveRecord::Migration[6.1]
  def change
    add_column :flappy_dot_scores, :game_id, :integer
  end
end
