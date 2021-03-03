class Api::TriviaController < ApplicationController

  skip_before_action :verify_authenticity_token

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

  def trivia_top_10_players
    scores = TriviaScore.order("score DESC").limit(10)
    render json: scores ,except: [:id, :trivium]
  end

  def add_score
    TriviaScore.create(score_params)
  end

  private

  def score_params
    {name: params[:name], score: params[:score], game_id: params[:game_id]}
  end

end
