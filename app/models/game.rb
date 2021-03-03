class Game < ApplicationRecord
  has_many :trivia
  has_many :trivia_scores
end
