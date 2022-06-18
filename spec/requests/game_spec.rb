require 'rails_helper'

RSpec.describe "Game", type: :request do
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
    let(:user) { create(:user) }

    context "存在しているユーザーを指定した場合" do
      before do
        get game_path(id: user.id)
      end

      it "200レスポンスすること" do
        expect(response.status).to eq 200
      end

      it "@userに値を代入すること" do
        get game_path(id: user.id)
        expect(controller.instance_variable_get(:@user)).to eq(user)
      end
    end

    context "存在していないユーザーを指定した場合" do
      before do
        get game_path(id: user.id + 1)
      end

      it "ランキングページにリダイレクトすること" do
        get game_path(id: user.id + 1)
        expect(response).to redirect_to game_index_path
      end

      it "302レスポンスすること" do
        get game_path(id: user.id + 1)
        expect(response.status).to eq 302
      end

      it "ユーザーが無かったことを知らせるフッラシュメッセージを表示すること" do
        expect(flash[:notice]).to match(I18n.t("errors.messages.returned_to_the_ranking_page_because_the_specified_user_did_not_exist"))
      end
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

      it 'ログインを促すフッラシュメッセージを表示すること' do
        expect(flash[:notice]).to match(I18n.t("errors.messages.please_login"))
      end
    end
  end

  describe "設定ページのupdateコントローラテスト" do
    let(:user) { create(:user) }
    let(:user_edit) { attributes_for(:user, se_volume: 5, bgm_volume: 5) }
    let(:over_value_user_edit) { attributes_for(:user, se_volume: 100, bgm_volume: 100) }

    context "se_volumeとbgm_volumeに正しい値を入力した場合" do
      before do
        sign_in user
        patch "/game/update", params: { user: user_edit }
      end

      it "302レスポンスすること" do
        expect(response.status).to eq 302
      end

      it "ログインユーザーのse_volumeの値が5に変更すること" do
        expect(user.se_volume).to eq(5)
      end

      it "ログインユーザーのbgm_volumeの値が5に変更すること" do
        expect(user.bgm_volume).to eq(5)
      end

      it "トップページにリダイレクトすること" do
        expect(response).to redirect_to root_path
      end

      it '設定完了のフラッシュメッセージが表示されること' do
        expect(flash[:notice]).to match(I18n.t("activerecord.messages.setup_save"))
      end
    end

    context "se_volumeとbgm_volumeにバリデーションより高い値を入力した場合" do
      before do
        sign_in user
        patch "/game/update", params: { user: over_value_user_edit }
      end

      it "302レスポンスすること" do
        expect(response.status).to eq 302
      end

      it 'エラーメッセージのフラッシュメッセージが表示されること' do
        expect(flash[:notice]).not_to be_nil
      end

      it "設定ページにリダイレクトすること" do
        expect(response).to redirect_to edit_game_path(user.id)
      end
    end

    context "ログインしていない場合" do
      before do
        patch "/game/update", params: { user: user_edit }
      end

      it "ログインページにリダイレクトすること" do
        expect(response).to redirect_to new_user_session_path
      end

      it "302レスポンスすること" do
        expect(response.status).to eq 302
      end

      it 'ログインを促すフッラシュメッセージを表示すること' do
        expect(flash[:notice]).to match(I18n.t("errors.messages.please_login"))
      end
    end
  end

  describe "ゲームプレイページのコントローラテスト" do
    let(:user) { create(:user) }
    let(:user_status) { { hiscore: user.hiscore, se_volume: user.se_volume, bgm_volume: user.bgm_volume } }

    context "ログインしている場合" do
      before do
        sign_in user
        get new_game_path, params: user_status
      end

      it "200レスポンスすること" do
        expect(response.status).to eq 200
      end
    end

    context "ログインしていない場合" do
      before do
        get new_game_path, params: user_status
      end

      it "ログインページにリダイレクトすること" do
        expect(response).to redirect_to new_user_session_path
      end

      it "302レスポンスすること" do
        expect(response.status).to eq 302
      end

      it 'ログインを促すフッラシュメッセージを表示すること' do
        expect(flash[:notice]).to match(I18n.t("errors.messages.please_login"))
      end
    end
  end

  describe "ゲームプレイページのcreateコントローラテスト" do
    let(:user) { create(:user, hiscore: 5) }
    let(:new_hiscore) { { score: 10 } }
    let(:not_hiscore) { { score: 0 } }

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

      it 'ハイスコアを更新した旨のフッラシュメッセージを表示すること' do
        expect(flash[:notice]).to match(I18n.t("activerecord.messages.hiscore_update"))
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

      it 'ハイスコアを更新しなかった旨のフッラシュメッセージを表示すること' do
        expect(flash[:notice]).to match(I18n.t("activerecord.messages.not_updating_hiscore"))
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

      it 'ログインを促すフッラシュメッセージを表示すること' do
        expect(flash[:notice]).to match(I18n.t("errors.messages.please_login"))
      end
    end
  end
end
