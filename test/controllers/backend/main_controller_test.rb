require "test_helper"

class Backend::MainControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get backend_main_index_url
    assert_response :success
  end
end
