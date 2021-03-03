class AddColumnToTriviaScore < ActiveRecord::Migration[6.1]
  def change
    add_column :trivia_scores, :game_id, :integer
  end
end
