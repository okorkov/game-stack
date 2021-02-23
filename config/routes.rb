Rails.application.routes.draw do

  root to: 'frontend/welcome#index'

  namespace :backend do
    get 'main/index'
  end
  namespace :frontend do
    get 'welcome/index'
  end
end
