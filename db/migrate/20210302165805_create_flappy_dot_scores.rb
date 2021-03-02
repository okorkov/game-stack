class CreateFlappyDotScores < ActiveRecord::Migration[6.1]
  def change
    create_table :flappy_dot_scores do |t|
      t.string :name
      t.string :score

    end
  end
end
