Rails.application.routes.draw do

  root to: 'frontend/welcome#index'

  namespace :backend do
    get 'main/easy_question'
    get 'main/medium_question'
    get 'main/hard_question'
  end
  namespace :frontend do
    # get 'welcome/index'
  end
end
