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

  describe "設定ページのコントローラテスト" do
    let(:user) { create(:user) }

    context "ログインしている場合" do
      before do
        sign_in user
        get edit_game_path(user.id)
      end

      it "200レスポンスすること" do
        expect(response.status).to eq 200
      end
    end

    context "ログインしていない場合" do
      before do
        get edit_game_path(user.id)
      end

      it "ログインページにリダイレクトすること" do
        expect(response).to redirect_to new_user_session_path
      end

      it "302レスポンスすること" do
        expect(response.status).to eq 302
      end

      it 'ログインしてくださいが表示されること' do
        expect(flash[:notice]).to match('ログインしてください')
      end
    end
  end

  describe "設定ページのupdateコントローラテスト" do
    let(:user) { create(:user) }
    let(:user_edit) { attributes_for(:user, se_volume: 5, bgm_volume: 5) }

    context "ログインしている場合" do
      before do
        sign_in user
        patch "/game/update", params: {user: user_edit}
      end

      it "302レスポンスすること" do
        expect(response.status).to eq 302
      end

      it "ログインユーザーのse_volumeの値が5に変更すること" do
        expect(user.se_volume).to eq(5)
      end

      it "ログインユーザーのse_volumeの値が5に変更すること" do
        expect(user.bgm_volume).to eq(5)
      end
    end

    context "ログインしていない場合" do
      before do
        patch "/game/update", params: {user: user_edit}
      end

      it "ログインページにリダイレクトすること" do
        expect(response).to redirect_to new_user_session_path
      end

      it "302レスポンスすること" do
        expect(response.status).to eq 302
      end

      it 'ログインしてくださいが表示されること' do
        expect(flash[:notice]).to match('ログインしてください')
      end
    end
  end

  describe "ゲームプレイページのコントローラテスト" do
    let(:user) { create(:user) }
    let(:user_status) {{ hiscore: user.hiscore, se_volume: user.se_volume, bgm_volume: user.bgm_volume }}

    context "ログインしている場合" do
      before do
        sign_in user
        get "/game/new", params: user_status
      end

      it "200レスポンスすること" do
        expect(response.status).to eq 200
      end
    end

    context "ログインしていない場合" do
      before do
        get "/game/new", params: user_status
      end

      it "ログインページにリダイレクトすること" do
        expect(response).to redirect_to new_user_session_path
      end

      it "302レスポンスすること" do
        expect(response.status).to eq 302
      end

      it 'ログインしてくださいが表示されること' do
        expect(flash[:notice]).to match('ログインしてください')
      end
    end
  end

  describe "ゲームプレイページのcreateコントローラテスト" do
    let(:user) { create(:user, hiscore: 5) }
    let(:new_hiscore) {{score:10}}
    let(:not_hiscore) {{score:0}}

    context "ログインしてハイスコアを更新した場合" do
      before do
        sign_in user
        post "/game", params: new_hiscore
      end

      it "302レスポンスすること" do
        expect(response.status).to eq 302
      end

      it "ログインユーザーのhiscoreの値が10に変更すること" do
        expect(user.hiscore).to eq(10)
      end

      it "ランキングページにリダイレクトすること" do
        expect(response).to redirect_to game_index_path
      end

      it 'ハイスコアを更新しましたが表示されること' do
        expect(flash[:notice]).to match('ハイスコアを更新しました')
      end
    end

    context "ログインしてハイスコアを更新しなかった場合" do
      before do
        sign_in user
        post "/game", params: not_hiscore
      end

      it "302レスポンスすること" do
        expect(response.status).to eq 302
      end

      it "ログインユーザーのhiscoreの値が5のままなこと" do
        expect(user.hiscore).to eq(5)
      end

      it "ランキングページにリダイレクトすること" do
        expect(response).to redirect_to game_index_path
      end

      it 'ハイスコアを更新しませんでしたが表示されること' do
        expect(flash[:notice]).to match('ハイスコアを更新しませんでした')
      end
    end

    context "ログインしていない場合" do
      before do
        post "/game", params: not_hiscore
      end

      it "ログインページにリダイレクトすること" do
        expect(response).to redirect_to new_user_session_path
      end

      it "302レスポンスすること" do
        expect(response.status).to eq 302
      end

      it 'ログインしてくださいが表示されること' do
        expect(flash[:notice]).to match('ログインしてください')
      end
    end
  end
end
