require 'rails_helper'

RSpec.describe "Games", type: :request do
  describe "ランキングページのコントローラテスト" do
    let!(:users) { create_list(:user, 5) }
    let(:ranking_users) { (users.sort { |a, b| b[:hiscore] <=> a[:hiscore] }) }

    before do
      get game_index_path
    end

    it "200レスポンスすること" do
      expect(response.status).to eq 200
    end

    it "@usersにハイスコア順で値を代入すること" do
      expect(controller.instance_variable_get(:@users)).to eq(ranking_users)
    end
  end
end
