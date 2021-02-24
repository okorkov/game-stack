class CreateTrivia < ActiveRecord::Migration[6.1]
  def change
    create_table :trivia do |t|
      t.string :category
      t.string :difficulty
      t.string :question
      t.string :correct_answer
      t.string :incorrect_answer_1
      t.string :incorrect_answer_2
      t.string :incorrect_answer_3
    end
  end
end
