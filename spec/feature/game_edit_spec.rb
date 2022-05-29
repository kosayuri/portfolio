require 'rails_helper'

RSpec.describe "game/edit.html.erb", type: :feature do
  describe "ゲーム設定ページのテスト" do
    let(:user) { create(:user) }

    before do
      sign_in user
      visit edit_game_path(user.id)
    end

    it "ひま撃ちのリンクを正しく表示すること" do
      expect(page).to have_link "ひま撃ち", href: root_path
    end

    it "プロフィール変更のリンクを正しく表示すること" do
      expect(page).to have_link "プロフィール変更", href: edit_user_registration_path
    end

    it "ログアウトのリンクを正しく表示すること" do
      expect(page).to have_link "ログアウト", href: destroy_user_session_path
    end

    it "フォームのリンクが正しいこと" do
      expect(page).to have_selector "form[action='/game/#{user.id}']"
    end

    it "効果音の音量の入力欄を表示すること" do
      expect(page).to have_selector 'input[name="user[se_volume]"]'
    end

    it "GBMの音量の入力欄を表示すること" do
      expect(page).to have_selector 'input[name="user[bgm_volume]"]'
    end

    it "ホーム画面に移動のリンクを正しく表示すること" do
      expect(page).to have_link "ホーム画面に移動", href: root_path
    end
  end
end
