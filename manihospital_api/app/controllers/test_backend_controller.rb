class TestBackendController < ApplicationController
  def index
    render json: { status: "Backend running successfully!", time: Time.now }
  end
end
