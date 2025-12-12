require "test_helper"

class TestBackendControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get test_backend_index_url
    assert_response :success
  end
end
