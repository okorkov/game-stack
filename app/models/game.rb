class Game < ApplicationRecord
  has_many :trivia_scores
  has_many :flappy_dot_scores
end
