class Api::FlappyDotController < ApplicationController

  skip_before_action :verify_authenticity_token

  def flappy_dot_top_10_players
    scores = FlappyDotScore.order("score DESC").limit(10)
    render json: scores ,except: [:id]
  end

  def add_score
    FlappyDotScore.create(score_params)
  end

  private

  def score_params
    {name: params[:name], score: params[:score]}
  end

end
