class CreateTriviaScores < ActiveRecord::Migration[6.1]
  def change
    create_table :trivia_scores do |t|
      t.integer :score
      t.string :name
    end
  end
end
