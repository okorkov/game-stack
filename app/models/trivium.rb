class Trivium < ApplicationRecord

  def self.get_questions_by_difficulty(difficulty)
    where(difficulty: "#{difficulty}").limit(1).order("RANDOM()")[0]
  end

end
