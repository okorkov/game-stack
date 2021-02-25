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

  def random_question
    render json: Trivium.order(Arel.sql('RANDOM()')).first
  end

end
