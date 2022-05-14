require 'rails_helper'

RSpec.describe "Homes", type: :request do
  describe "トップページのコントローラテスト" do
    it "200レスポンスすること" do
      get root_url
      expect(response.status).to eq 200
    end
  end
end
