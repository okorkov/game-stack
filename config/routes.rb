Rails.application.routes.draw do

  root to: 'frontend/welcome#index'

  namespace :api do
    get 'trivia/easy_question'
    get 'trivia/medium_question'
    get 'trivia/hard_question'
    get 'trivia/random_question'
    get 'trivia/trivia_top_10_players'
    post 'trivia/add_score'
  end

end
