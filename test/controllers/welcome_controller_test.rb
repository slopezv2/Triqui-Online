require 'test_helper'

class WelcomeControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get welcome_index_url
    assert_response :success
  end

  test "should get signup" do
    get welcome_signup_url
    assert_response :success
  end

  test "should get perfil" do
    get welcome_perfil_url
    assert_response :success
  end

  test "should get gamea" do
    get welcome_gamea_url
    assert_response :success
  end

end
