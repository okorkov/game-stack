require "test_helper"

class Frontend::WelcomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get frontend_welcome_index_url
    assert_response :success
  end
end
