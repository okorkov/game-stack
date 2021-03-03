class Api::GamesController < ApplicationController

  skip_before_action :verify_authenticity_token

  def all_scores
    render json: Game.all 
  end

end