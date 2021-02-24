class Backend::MainController < ApplicationController

  def easy_question
    question = Trivium.where(difficulty: "easy").limit(1).order("RANDOM()")[0]
    render json: question
  end

  def medium_question
    question = Trivium.where(difficulty: "medium").limit(1).order("RANDOM()")[0]
    render json: question
  end

  def hard_question
    question = Trivium.where(difficulty: "hard").limit(1).order("RANDOM()")[0]
    render json: question
  end

end
