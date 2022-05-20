require 'rails_helper'

RSpec.describe "devise/passwords/edit.html.erb", type: :feature do
  describe "パスワードを変更ページのテスト" do
    let(:user) { create(:user) }

    it "ひま撃ちのリンクを正しく表示すること" do
      visit edit_user_password_path(reset_password_token: user.reset_password_token)
      expect(page).to have_link "ひま撃ち", href: root_path
    end

    it "アカウント登録のリンクを正しく表示すること" do
      visit edit_user_password_path(reset_password_token: user.reset_password_token)
      expect(page).to have_link "アカウント登録", href: new_user_registration_path
    end

    it "ヘッダーのログインのリンクを正しく表示すること" do
      visit edit_user_password_path(reset_password_token: user.reset_password_token)
      within(:css, 'div[id="header"]') do
        expect(page).to have_link "ログイン", href: new_user_session_path
      end
    end

    it "フォームのリンクが正しいこと" do
      visit edit_user_password_path(reset_password_token: user.reset_password_token)
      expect(page).to have_selector "form[action='#{user_password_path}']"
    end

    it "パスワードの入力欄を表示すること" do
      visit edit_user_password_path(reset_password_token: user.reset_password_token)
      expect(page).to have_selector 'input[name="user[password]"]'
    end

    it "確認用新しいパスワードの入力欄を表示すること" do
      visit edit_user_password_path(reset_password_token: user.reset_password_token)
      expect(page).to have_selector 'input[name="user[password_confirmation]"]'
    end

    it "送信ボタンの下にあるログインのリンクを正しく表示すること" do
      visit edit_user_password_path(reset_password_token: user.reset_password_token)
      within(:css, 'div[class="account-forum"]') do
        expect(page).to have_link "ログイン", href: new_user_session_path
      end
    end

    it "パスワードを変更するボタンの下にあるアカウント登録のリンクを正しく表示すること" do
      visit edit_user_password_path(reset_password_token: user.reset_password_token)
      within(:css, 'div[class="account-forum"]') do
        expect(page).to have_link "アカウント登録", href: new_user_registration_path
      end
    end
  end
end
