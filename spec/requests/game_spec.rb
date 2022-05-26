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

  describe "ユーザー詳細ページのコントローラテスト" do
    let!(:user) { create(:user) }

    it "200レスポンスすること" do
      get game_path(id: user.id)
      expect(response.status).to eq 200
    end

    it "@userに値を代入すること" do
      get game_path(id: user.id)
      expect(controller.instance_variable_get(:@user)).to eq(user)
    end

    it "存在しないユーザーを指定した場合、ランキングページにリダイレクトすること" do
      get game_path(id: user.id + 1)
      expect(response).to redirect_to game_index_path
    end

    it "存在しないユーザーを指定した場合、302レスポンスすること" do
      get game_path(id: user.id + 1)
      expect(response.status).to eq 302
    end
  end
end
