require 'rails_helper'

RSpec.describe "devise/sessions/new.html.erb", type: :feature do
  describe "ログインページのテスト" do
    it "ひま撃ちのリンクを正しく表示すること" do
      visit new_user_session_path
      expect(page).to have_link "ひま撃ち", href: root_path
    end

    it "アカウント登録のリンクを正しく表示すること" do
      visit new_user_session_path
      expect(page).to have_link "アカウント登録", href: new_user_registration_path
    end

    it "ヘッダーのログインのリンクを正しく表示すること" do
      visit new_user_session_path
      within(:css, 'div[class="header"]') do
        expect(page).to have_link "ログイン", href: new_user_session_path
      end
    end

    it "フォームのリンクが正しいこと" do
      visit new_user_session_path
      expect(page).to have_selector "form[action='#{user_session_path}']"
    end

    it "Eメールの入力欄を表示すること" do
      visit new_user_session_path
      expect(page).to have_selector 'input[name="user[email]"]'
    end

    it "パスワードの入力欄を表示すること" do
      visit new_user_session_path
      expect(page).to have_selector 'input[name="user[password]"]'
    end

    it "ログインを記憶するのチェックボックスを表示すること" do
      visit new_user_session_path
      expect(page).to have_selector 'input[name="user[remember_me]"]'
    end

    it "登録ボタンの下にあるアカウント登録のリンクを正しく表示すること" do
      visit new_user_session_path
      within(:css, 'div[class="account-forum"]') do
        expect(page).to have_link "アカウント登録", href: new_user_registration_path
      end
    end

    it "パスワードを忘れましたか？のリンクを正しく表示すること" do
      visit new_user_session_path
      expect(page).to have_link "パスワードを忘れましたか？", href: new_user_password_path
    end
  end
end
