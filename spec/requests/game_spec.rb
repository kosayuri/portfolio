require 'rails_helper'

RSpec.describe "Games", type: :request do
  describe "GET /ranking" do
    it "returns http success" do
      get "/game/ranking"
      expect(response).to have_http_status(:success)
    end
  end

end
