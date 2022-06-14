require 'rails_helper'

RSpec.describe "devise/passwords/new.html.erb", type: :feature do
  describe "パスワードを忘れましたか？ページのテスト" do
    before do
      visit new_user_password_path
    end

    it "ひま撃ちのリンクを正しく表示すること" do
      expect(page).to have_link "ひま撃ち", href: root_path
    end

    it "アカウント登録のリンクを正しく表示すること" do
      expect(page).to have_link "アカウント登録", href: new_user_registration_path
    end

    it "ヘッダーのログインのリンクを正しく表示すること" do
      within(:css, 'div[id="header"]') do
        expect(page).to have_link "ログイン", href: new_user_session_path
      end
    end

    it "フォームのリンクが正しいこと" do
      expect(page).to have_selector "form[action='#{user_password_path}']"
    end

    it "Eメールの入力欄を表示すること" do
      expect(page).to have_selector 'input[name="user[email]"]'
    end

    it "送信ボタンの下にあるログインのリンクを正しく表示すること" do
      within(:css, 'div[class="account-forum"]') do
        expect(page).to have_link "ログイン", href: new_user_session_path
      end
    end

    it "送信ボタンの下にあるアカウント登録のリンクを正しく表示すること" do
      within(:css, 'div[class="account-forum"]') do
        expect(page).to have_link "アカウント登録", href: new_user_registration_path
      end
    end
  end
end
