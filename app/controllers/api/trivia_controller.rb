class Api::TriviaController < ApplicationController

  def easy_question
    render json: Trivium.get_questions_by_difficulty('easy')
  end

  def medium_question
    render json: Trivium.get_questions_by_difficulty('medium')
  end

  def hard_question
    render json: Trivium.get_questions_by_difficulty('hard')
  end

end
