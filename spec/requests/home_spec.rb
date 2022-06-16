require 'rails_helper'

RSpec.describe "Homes", type: :request do
  describe "トップページのコントローラテスト" do
    let(:user) { create(:user) }
    let(:game_status) { { hiscore: user.hiscore, se_volume: user.se_volume, bgm_volume: user.bgm_volume } }

    context "ログインしている場合" do
      before do
        sign_in user
        get root_url
      end

      it "200レスポンスすること" do
        expect(response.status).to eq 200
      end

      it "@game_statusに値を代入すること" do
        expect(controller.instance_variable_get(:@game_status)).to eq(game_status)
      end
    end

    context "ログインしていない場合" do
      before do
        get root_url
      end

      it "200レスポンスすること" do
        expect(response.status).to eq 200
      end

      it "@game_statusに値を代入しないこと" do
        expect(controller.instance_variable_get(:@game_status)).to be_nil
      end
    end
  end
end
