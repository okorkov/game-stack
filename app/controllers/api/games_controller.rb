class Api::GamesController < ApplicationController

  skip_before_action :verify_authenticity_token

  def all_scores
    games = Game.all
    render json: games, include: [:trivia_scores, :flappy_dot_scores]
  end

end
